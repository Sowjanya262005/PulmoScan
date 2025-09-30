import json, os, datetime

TPL = "reports/template.html"
MET = "reports/metrics.json"
OUT = "reports/report.html"

def main():
    with open(TPL, "r", encoding="utf-8") as f:
        tpl = f.read()
    with open(MET, "r", encoding="utf-8") as f:
        data = json.load(f)

    data.setdefault("date", datetime.date.today().isoformat())
    # naive string replacement using {{keys}}
    def rep(s, key_path, value):
        return s.replace("{{" + key_path + "}}", str(value))

    # flatten known keys
    out = tpl
    out = rep(out, "date", data.get("date",""))
    for k in ["pneumonia","tb"]:
        for m in ["acc","prec","rec","f1","auc"]:
            out = rep(out, f"{k}.{m}", data.get(k,{}).get(m,""))
    for m in ["acc","f1","notes"]:
        out = rep(out, f"lc.{m}", data.get("lc",{}).get(m,""))
    out = rep(out, "images.pneumonia", data.get("images",{}).get("pneumonia",""))
    out = rep(out, "images.tb", data.get("images",{}).get("tb",""))
    out = rep(out, "images.lc", data.get("images",{}).get("lc",""))
    out = rep(out, "discussion", data.get("discussion",""))

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(out)
    print(f"Wrote {OUT}. Open in a browser and print to PDF.")

if __name__ == "__main__":
    main()
