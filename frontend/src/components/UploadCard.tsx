import { useState } from 'react'
import { predict } from '../lib/api'

export default function UploadCard(){
  const [file,setFile] = useState<File|null>(null)
  const [disease,setDisease] = useState<'pneumonia'|'tb'|'lungcancer'>('pneumonia')
  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState<any>(null)
  const [preview,setPreview] = useState<string>('')
  const [showHeat,setShowHeat] = useState(true)

  const onSelect = (e: any)=>{
    const f = e.target.files?.[0]; if(!f) return;
    setFile(f); setPreview(URL.createObjectURL(f)); setResult(null)
  }

  const onPredict = async(explain=false)=>{
    if(!file) return; setLoading(true);
    try{ setResult(await predict(disease, file, explain)); }
    catch(err){ alert(String(err)); }
    finally{ setLoading(false); }
  }

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">LungCare‑AI</h2>
        <select value={disease} onChange={e=>setDisease(e.target.value as any)} className="border rounded px-3 py-2">
          <option value="pneumonia">Pneumonia</option>
          <option value="tb">Tuberculosis</option>
          <option value="lungcancer">Lung Cancer</option>
        </select>
      </div>

      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
        <input type="file" accept="image/*" onChange={onSelect} className="hidden" />
        <span className="text-sm opacity-70">Drop an X‑ray / image or click to upload</span>
      </label>

      {preview && (
        <div className="mt-4 relative">
          <img src={preview} alt="preview" className="rounded-xl max-h-72 object-contain w-full"/>
          {result?.heatmap_b64 && showHeat && (
            <img src={`data:image/png;base64,${result.heatmap_b64}`} className="rounded-xl max-h-72 object-contain w-full absolute inset-0 mix-blend-multiply pointer-events-none" />
          )}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button onClick={()=>onPredict(false)} disabled={!file||loading} className="py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50">
          {loading? 'Analyzing…':'Predict'}
        </button>
        <button onClick={()=>onPredict(true)} disabled={!file||loading} className="py-3 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50">
          {loading? 'Explaining…':'Predict + Explain'}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
          <div className="font-semibold capitalize">Disease: {result.disease}</div>
          <div className="text-lg mt-1">Prediction: <b>{result.label}</b> ({(result.score*100).toFixed(1)}%)</div>
          <div className="text-sm mt-2 opacity-70">Top‑K: {result.topk_labels.map((l: string, i: number)=>`${l} ${(result.topk_scores[i]*100).toFixed(0)}%`).join(', ')}</div>
          {result?.heatmap_b64 && (
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={showHeat} onChange={e=>setShowHeat(e.target.checked)} />
              Show heatmap overlay
            </label>
          )}
          <div className="text-xs mt-2 opacity-60">Disclaimer: Educational demo only.</div>
        </div>
      )}
    </div>
  )
}
