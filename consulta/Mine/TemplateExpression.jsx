export const TemplateExpression = () => {
  const name = "Elias";
  const date = {
    age: 25,
    job: "PT",
  };
  return (
    <div>
      <p> A soma é {2 + 2}</p>
      <p> Bem-vindo {name}</p>
      <p>
        {" "}
        Your age is {date.age} and your job is {date.job}
      </p>
    </div>
  );
};

export default TemplateExpression;
