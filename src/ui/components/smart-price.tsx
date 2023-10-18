export function SmartPrice({ price }: { price: string | number }) {
  const castedPrice = String(price);
  if (castedPrice === 'N/A' && !castedPrice) return <>-</>;

  // The case where the price is not too small
  const mustReduce = castedPrice.substring(0, 6) === '0.0000';
  if (!mustReduce) {
    if (castedPrice.includes('.')) {
      if (Number(price) > 1000000) return <>{castedPrice.split('.')[0]}</>;
      if (Number(castedPrice) > 100)
        return <>{Number(castedPrice).toFixed(2)}</>;
    }
    return <>{castedPrice.substring(0, 8)}</>;
  }

  // The case where the price needs to be reduced
  let zeroCount = 0;
  const i = 0;
  let endingFour = '';

  for (let mStr = castedPrice.substring(3); i < mStr.length; i + 1) {
    if (mStr[i] === '0') {
      zeroCount += 1;
    } else {
      endingFour = mStr.substring(i, i + 4);
      break;
    }
  }

  return (
    <>
      0.0<sub>{zeroCount}</sub>
      {endingFour}
    </>
  );
}
