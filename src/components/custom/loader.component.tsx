import { FC } from 'react';

const RomanticLoader: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        background: 'linear-gradient(to bottom, #f8bbd0 0%, #fff 100%)'
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          border: '6px solid #ffe4e1',
          borderTop: '6px solid #d81b60',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <p style={{ marginTop: '20px', color: '#d81b60', fontSize: '1.1rem' }}>
        Твоє романтичне бажання зараз народжується...
      </p>

      {/* Додаємо ключовий кадр для анімації обертання */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default RomanticLoader;