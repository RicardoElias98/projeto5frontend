function CarDetails({brand, km, color}) {
  return (
    <div>
      <h2>CarDetails:</h2>
      <ul>
        <li>Marca: {brand}</li>
        <li>Km: {km}</li>
        <li>Color: {color}</li>
      </ul>
    </div>
  );
}

export default CarDetails;
