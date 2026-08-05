import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Theme } from '../../../themes'

export type EmergencyFilterKey = 'high' | 'medium' | 'low' | 'hospital'
export type EmergencyFilterState = Record<EmergencyFilterKey, boolean>

export const initialEmergencyFilters: EmergencyFilterState = {
  high: true,
  medium: true,
  low: true,
  hospital: true,
}

interface EmergencyMapProps {
  theme: Theme
  activeFilters: EmergencyFilterState
}

const EmergencyMap = ({ theme, activeFilters }: EmergencyMapProps) => {
  const { t } = useTranslation()
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const mapLoadedRef = useRef(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (!mapContainer.current) {
      return
    }

    let isCancelled = false
    const fallbackTimer = window.setTimeout(() => {
      if (!isCancelled) {
        setShowFallback(true)
      }
    }, 4000)

    try {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap contributors',
              maxzoom: 19,
            },
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
            },
          ],
        },
        center: [39.1728, 21.5433],
        zoom: 10.5,
        pitch: 45,
        bearing: -20,
        attributionControl: false,
      })

      mapRef.current = map

      map.on('load', () => {
        if (isCancelled) {
          return
        }

        mapLoadedRef.current = true
        window.clearTimeout(fallbackTimer)
        setShowFallback(false)
        window.requestAnimationFrame(() => map.resize())

        const routeCoordinates = [
          [39.1728, 21.5433],
          [39.1608, 21.5599],
        ]

        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: routeCoordinates,
                },
                properties: {},
              },
            ],
          },
        })

        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#d32f2f',
            'line-width': 3,
            'line-dasharray': [0.4, 1.2],
          },
        })

        renderMarkers()
      })

      map.on('error', () => {
        if (isCancelled) {
          return
        }

        window.clearTimeout(fallbackTimer)
        setShowFallback(true)
      })

      return () => {
        isCancelled = true
        window.clearTimeout(fallbackTimer)
        map.remove()
        mapRef.current = null
        mapLoadedRef.current = false
        markersRef.current.forEach(marker => marker.remove())
        markersRef.current = []
      }
    } catch {
      window.clearTimeout(fallbackTimer)
      setShowFallback(true)
      return undefined
    }
  }, [])

  const renderMarkers = () => {
    if (!mapLoadedRef.current || !mapRef.current) {
      return
    }

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    const markers: Array<{ key: EmergencyFilterKey; color: string; lng: number; lat: number }> = [
      { key: 'high', color: '#d32f2f', lng: 39.1728, lat: 21.5433 },
      { key: 'high', color: '#d32f2f', lng: 39.1789, lat: 21.5517 },
      { key: 'medium', color: '#fbc02d', lng: 39.1694, lat: 21.5376 },
      { key: 'low', color: '#388e3c', lng: 39.1608, lat: 21.5599 },
      { key: 'hospital', color: '#1e88e5', lng: 39.1584, lat: 21.5482 },
    ]

    markers.forEach((markerData) => {
      if (!activeFilters[markerData.key]) {
        return
      }

      const marker = new maplibregl.Marker({ color: markerData.color })
        .setLngLat([markerData.lng, markerData.lat])
        .addTo(mapRef.current!)

      markersRef.current.push(marker)
    })
  }

  useEffect(() => {
    renderMarkers()
  }, [activeFilters])

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#3C1B21]/90 shadow-2xl shadow-black/20">
      {showFallback ? (
        <div className="flex h-[420px] w-full items-center justify-center overflow-hidden bg-[#12070b]">
          <svg viewBox="0 0 600 420" className="h-full w-full object-cover">
            <rect x="0" y="0" width="600" height="420" fill="#1f1115" />
            <path d="M80 120 C140 80, 220 90, 260 150 C300 205, 270 285, 190 315 C130 340, 70 300, 56 239 C46 187, 36 148, 80 120 Z" fill="#2d1b22" />
            <path d="M320 90 C380 70, 470 95, 500 140 C530 180, 512 255, 476 290 C438 330, 365 335, 330 295 C288 245, 270 135, 320 90 Z" fill="#26141b" />
            <path d="M180 150 L260 180 L230 250 L145 225 Z" fill="#3a2028" />
            <path d="M360 165 L430 175 L410 250 L340 240 Z" fill="#392125" />
            <path d="M242 190 C270 170, 305 172, 323 194 C340 214, 338 247, 314 263 C289 279, 247 274, 229 248 C212 223, 214 208, 242 190 Z" fill="#2e1a20" />
            <line x1="140" y1="165" x2="220" y2="240" stroke="#d32f2f" strokeWidth="4" strokeDasharray="8 6" />
            <line x1="290" y1="220" x2="410" y2="190" stroke="#d32f2f" strokeWidth="4" strokeDasharray="8 6" />
            <circle cx="220" cy="240" r="9" fill="#d32f2f" />
            <circle cx="410" cy="190" r="9" fill="#fbc02d" />
            <circle cx="290" cy="220" r="9" fill="#388e3c" />
            <circle cx="370" cy="260" r="10" fill="#1e88e5" />
          </svg>
        </div>
      ) : (
        <div ref={mapContainer} className="h-[420px] min-h-[420px] w-full" />
      )}
      <div className="pointer-events-none absolute right-4 top-4 rounded-2xl border border-white/10 bg-[#1b0c10]/90 p-3 text-sm text-white shadow-lg backdrop-blur" style={{ background: theme.mainColor, direction: 'rtl' }}>
        <p className="mb-2 font-semibold text-right">{t('emergency.mapLegendTitle')}</p>
        <div className="space-y-2 text-xs text-[#e0d3d4]">
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#d32f2f]" />{t('emergency.mapLegendHigh')}</div>
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#fbc02d]" />{t('emergency.mapLegendMedium')}</div>
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#388e3c]" />{t('emergency.mapLegendLow')}</div>
          <div className="flex items-center gap-2"><span className="text-[#1e88e5]">✚</span>{t('emergency.mapLegendHospital')}</div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-[#1b0c10]/80 px-4 py-3 text-sm text-white backdrop-blur">
        <p className="font-semibold">{t('emergency.caseTitle')}</p>
        <p className="text-xs text-[#e2b9c2]">{t('emergency.values.location')}</p>
      </div>
    </div>
  )
}

export default EmergencyMap
