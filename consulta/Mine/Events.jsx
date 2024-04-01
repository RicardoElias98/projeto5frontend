const Events = () => {
  const handleClick = () => {
    console.log("Here test 1");
  };

  //Função de Renderização
  const renderSomething = (x) => {
    if (x) {
      return <h1> Está a ser renderizado</h1>;
    } else {
      return <h1> Não está a ser renderizado</h1>;
    }
  };

  return (
    <div>
      <div>
        {" "}
        <button onClick={() => console.log("Clicked")}> Click Here</button>
      </div>
      <div>
        <button onClick={handleClick}> HandleClick</button>
      </div>
      {renderSomething(true)}
      {renderSomething(false)}
    </div>
  );
};

export default Events;
