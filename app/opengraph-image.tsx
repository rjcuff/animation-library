import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'tweens — The lightweight animation library for the web'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Subtle dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Spring wave logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 52,
            height: 52,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 10 C2 5, 7 5, 10 10 C13 15, 18 15, 18 10"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-3px',
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          tweens
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.40)',
            letterSpacing: '-0.5px',
            marginBottom: 40,
          }}
        >
          The lightweight animation library for the web.
        </div>

        {/* Pills row */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['~2kb gzipped', 'Zero dependencies', 'Promise-based', 'TypeScript'].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 100,
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.2px',
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  )
}
