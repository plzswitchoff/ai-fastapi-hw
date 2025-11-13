export async function translateAndScore(text){
    const res=await fetch('/v1/translate',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({text})
    });
    const data=await res.json();
    if (!res.ok) throw new Error(data?.detail || 'request failed');
    return data;
}