const Copyright = () => {
  return (
    <div
      style={{
        display: 'flex',
        fontWeight: '400',
        fontSize: '1.4rem',
        lineHeight: '2.4rem',
        color: 'white',
        gap: '1rem',
      }}
    >
      <span>Made with ♥ by</span>
      <span style={{ textDecoration: 'underline', textUnderlineOffset: '0.5rem' }}>
        <a href="https://llbbl.com/">Logan</a>
      </span>
    </div>
  );
};

export default Copyright;
