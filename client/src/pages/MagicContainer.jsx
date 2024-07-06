import React, { useRef } from 'react';
import { useCookies } from 'react-cookie';

const MagicContainer = () => {
    const [cookies, setCookie] = useCookies();
    const tref = useRef();
  const handleSearch = () => {
    setCookie("code_word",tref.current.value)
  };

  return (
    <div style={{display:'flex' ,width:'100vw',backgroundColor:'#000000', alignItems: 'center',justifyContent:'center', }}>
    <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', backgroundColor: '#000000', padding: '8px', borderRadius: '4px' }}>
      <input
      ref={tref}
        type="text"
        placeholder="ENTER CODE WORD"
        style={{ flexGrow: 1, marginRight: '8px', padding: '8px', border: 'none', backgroundColor: '#222', color: 'white', borderRadius: '4px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px 12px', backgroundColor: '#222', color: 'white', border: 'none', borderRadius: '4px' }}>
        Enter
      </button>
    </div>
    </div>

  );
};

export default MagicContainer;
