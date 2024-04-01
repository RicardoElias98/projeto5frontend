import React from "react";

function ConditionalRender() {
  const x = false;
  return (
    <div>
      <h3> Exibição?</h3>
      {x ? <p> Verdade </p> : <p>Falso</p>}
    </div>
  );
}

export default ConditionalRender;
