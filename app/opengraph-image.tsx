import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BrandBazar - Premium Corporate Branding Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F1E8',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative accent element */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: '#4D7CFE',
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            backgroundColor: '#4D7CFE',
            opacity: 0.06,
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            backgroundColor: '#111111',
            marginBottom: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: '36px',
              fontWeight: 700,
              letterSpacing: '-1px',
            }}
          >
            BB
          </span>
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: '#111111',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            margin: '0 0 16px 0',
          }}
        >
          BrandBazar
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '28px',
            fontWeight: 500,
            color: '#4a4a4a',
            letterSpacing: '-0.5px',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Premium Corporate Branding & Merchandise Solutions
        </p>

        {/* Accent line */}
        <div
          style={{
            width: '80px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: '#4D7CFE',
            marginTop: '40px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
