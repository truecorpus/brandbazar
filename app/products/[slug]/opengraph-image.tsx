import { ImageResponse } from 'next/og';
import { getProductBySlug } from '@/lib/products/data';

export const runtime = 'edge';
export const alt = 'BrandBazar Products';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  const title = product?.name ?? 'BrandBazar';
  const label = product?.category ?? 'BrandBazar Products';
  const tagline = product?.tagline ?? 'Premium Corporate Branding & Merchandise Solutions';

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
          padding: '60px',
        }}
      >
        {/* Decorative accent elements */}
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

        {/* Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 24px',
            borderRadius: '9999px',
            backgroundColor: '#4D7CFE',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase' as const,
            marginBottom: '32px',
          }}
        >
          {label}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#111111',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            margin: '0 0 20px 0',
            textAlign: 'center',
          }}
        >
          {title}
        </h1>

        {/* Tagline / fallback */}
        <p
          style={{
            fontSize: '26px',
            fontWeight: 500,
            color: '#4a4a4a',
            letterSpacing: '-0.3px',
            lineHeight: 1.4,
            margin: 0,
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          {tagline}
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

        {/* BrandBazar wordmark at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#111111',
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700 }}>
              BB
            </span>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#111111', letterSpacing: '-0.5px' }}>
            BrandBazar
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
