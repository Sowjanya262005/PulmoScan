# LungCare‑AI (Starter Repo)

**Stack:** React (Vite + TS + Tailwind), FastAPI, PyTorch (timm), Docker.

> Academic demo only. Not a medical device.

## Quickstart

### 1) Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3) With Docker
```bash
docker compose up --build
```

### 4) Train models
See `training/` and the configs in `training/configs/*.yaml`. Export best weights to `backend/models/` paths matching names in `backend/routers/predict.py`.

---

## Datasets (recommended)

- **Pneumonia (CXR):** *Chest X-Ray Images (Pneumonia)*
  - Expected folders:
    ```
    /data/pneumonia/train/{normal,pneumonia}
    /data/pneumonia/val/{normal,pneumonia}
    /data/pneumonia/test/{normal,pneumonia}
    ```

- **TB (CXR):** *Shenzhen/Montgomery* combined (normalize to `tb` vs `normal`)
  - Expected folders similar to above at `/data/tb/...`

- **Lung Cancer:** *LC25000* (use lung subset; either 2-class {normal,cancer} or 3-class)
  - Expected folders under `/data/lungcancer/...`

> Tip: Use a small **validation** set and hold out **test** once. Balance classes where possible.

---

## Grad‑CAM / Explainability

- Set `EXPLAIN=true` env var or call `/api/predict/{disease}?explain=1` to receive `heatmap_b64` for UI overlay.
- Works with the default ResNet‑18 backbone.

---

## Exam viva talking points
- Problem framing, dataset choices, transfer learning, metrics (precision/recall/F1/AUC), Grad‑CAM examples, limitations & future work.


---

## Prefilled dataset choices (no approval needed)

- **Pneumonia (Chest X-Ray Images (Pneumonia), Kaggle):** use its built-in `train/val/test` split.  
  Link: search Kaggle for **"Chest X-Ray Images (Pneumonia)"** by Paul Mooney.

- **Tuberculosis (Shenzhen + Montgomery merged, Kaggle mirrors):** normalize labels to `{normal, tb}` and split into `train/val/test`.

- **Lung Cancer (LC25000, Kaggle) — **3 classes**: `{normal, adenocarcinoma, squamous}`.  
  We'll train a 3-class classifier for the lung subset.

Make sure your final folder tree matches the YAMLs in `training/configs/`.
