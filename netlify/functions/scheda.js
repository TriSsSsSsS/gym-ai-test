exports.handler = async (event) => {
  const b = JSON.parse(event.body);
  const prompt = `Crea una scheda palestra settimanale per ${b.eta} anni, ${b.peso} kg, ${b.altezza} cm, obiettivo ${b.obiettivo}, limitazioni: ${b.dolori}.`;
  const res = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  const data = await res.json();
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ scheda: data[0]?.generated_text || "Errore" }),
  };
};
