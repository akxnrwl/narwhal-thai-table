/* AUTO-GENERATED from Narwhal-Profit-Calculator.html — owner profit & draw
   calculator, served gated by app/api/owner/cal/route.ts. Edit the source
   HTML and regenerate rather than hand-editing this string. */
export const calculatorHtml = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Narwhal — เครื่องคิดเลขกำไร & Owner Draw</title>
<style>
  :root{
    --navy:#0B1F33; --navy2:#10283f; --brass:#B08D3C; --brassL:#D4B36A;
    --off:#F5F0E6; --line:rgba(200,162,78,0.22); --panel:rgba(255,255,255,0.04);
    --green:#5BBF7B; --red:#e0907a; --muted:rgba(245,240,230,0.55);
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--navy);color:var(--off);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Sukhumvit Set","Noto Sans Thai",Tahoma,sans-serif;
    line-height:1.5;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1120px;margin:0 auto;padding:26px 18px 70px}
  h1{font-family:Georgia,serif;font-size:26px;margin:0 0 2px}
  h1 em{color:var(--brassL);font-style:normal}
  .sub{color:var(--muted);font-size:13px;margin-bottom:18px}
  .presets{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
  .preset{padding:8px 14px;border-radius:999px;background:var(--panel);border:1px solid var(--line);
    color:var(--off);cursor:pointer;font-size:13px;transition:.15s}
  .preset:hover{background:rgba(176,141,60,0.18)}
  .preset.active{background:var(--brass);color:var(--navy);font-weight:600;border-color:var(--brass)}
  .layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:18px;align-items:start}
  @media(max-width:840px){.layout{grid-template-columns:1fr}}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin-bottom:16px}
  .card h2{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--brassL);margin:0 0 14px}
  .field{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:11px}
  .field:last-child{margin-bottom:0}
  .field label{font-size:13.5px;color:rgba(245,240,230,0.85);flex:1}
  .field .hint{display:block;font-size:11px;color:var(--muted)}
  input[type=number]{width:108px;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,0.06);
    border:1px solid var(--line);color:var(--off);font-size:14px;text-align:right;outline:none}
  input[type=number]:focus{border-color:var(--brass)}
  .row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .slideField{margin-bottom:13px}
  .slideField .top{display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:4px}
  .slideField .top b{color:var(--brassL)}
  input[type=range]{width:100%;accent-color:var(--brass)}
  .toggle{display:inline-flex;border:1px solid var(--line);border-radius:999px;overflow:hidden;margin-bottom:12px}
  .toggle button{padding:7px 14px;background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:12.5px}
  .toggle button.on{background:var(--brass);color:var(--navy);font-weight:600}
  table.grid{width:100%;border-collapse:collapse;font-size:13px}
  table.grid th{font-size:11px;color:var(--muted);font-weight:500;text-align:center;padding:4px}
  table.grid td{padding:3px 4px}
  table.grid td:first-child{text-align:left;color:rgba(245,240,230,0.85)}
  table.grid input{width:54px;padding:6px;border-radius:6px;background:rgba(255,255,255,0.06);
    border:1px solid var(--line);color:var(--off);text-align:center;font-size:13px;outline:none}
  table.grid input:focus{border-color:var(--brass)}
  /* results */
  .results{position:sticky;top:14px}
  .res-hero{background:linear-gradient(160deg,#13314d,#0c2236);border:1px solid var(--line);
    border-radius:16px;padding:20px;margin-bottom:14px}
  .res-hero .lab{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--brassL)}
  .res-hero .draw{font-family:Georgia,serif;font-size:40px;font-weight:700;color:var(--off);margin:4px 0 2px}
  .res-hero .draw small{font-size:15px;color:var(--muted)}
  .res-hero .total{font-size:13px;color:var(--muted)}
  .bar{display:flex;height:26px;border-radius:7px;overflow:hidden;margin:14px 0 6px;border:1px solid var(--line)}
  .bar span{display:block;height:100%}
  .legend{display:flex;flex-wrap:wrap;gap:10px;font-size:11.5px;color:var(--muted);margin-bottom:4px}
  .legend i{display:inline-block;width:9px;height:9px;border-radius:2px;margin-right:4px;vertical-align:middle}
  .lines{font-size:13.5px}
  .lines .l{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.05)}
  .lines .l.tot{border-top:1px solid var(--line);border-bottom:none;margin-top:4px;padding-top:10px;font-weight:700}
  .lines .l .neg{color:var(--red)}
  .lines .l .pos{color:var(--green)}
  .lines .l b{font-variant-numeric:tabular-nums}
  .pill{display:inline-block;font-size:11px;padding:2px 8px;border-radius:999px;background:rgba(176,141,60,0.18);
    color:var(--brassL);margin-left:6px}
  .note{font-size:11.5px;color:var(--muted);margin-top:12px;line-height:1.55}
  .cap{font-size:12.5px;color:var(--muted);margin-top:8px}
  details{margin-top:8px}
  summary{cursor:pointer;font-size:12.5px;color:var(--brassL)}
  .disabled{opacity:.4;pointer-events:none}
</style>
</head>
<body>
<div class="wrap">
  <h1>Narwhal — <em>เครื่องคิดเลขกำไร &amp; Owner Draw</em></h1>
  <div class="sub">ปรับทุกค่าได้อิสระ ผลคำนวณเปลี่ยนทันที · LLC = ถอนกำไรเป็น draw แบ่งตามหุ้นส่วน</div>

  <div class="presets">
    <button class="preset" onclick="preset('soft')">เดือนแรก soft open ($3k/วัน)</button>
    <button class="preset" onclick="preset('thainakorn')">ระดับไทยนคร (wd $6k / we $12k)</button>
    <button class="preset" onclick="preset('mid')">เป้ากลาง (wd $4k / we $7k)</button>
  </div>

  <div class="layout">
    <!-- ============ INPUTS ============ -->
    <div>
      <div class="card">
        <h2>ยอดขาย</h2>
        <div class="row2">
          <div class="field"><label>วันธรรมดา $/วัน</label><input type="number" id="wdSales" value="3000" oninput="calc()"></div>
          <div class="field"><label>เสาร์-อาทิตย์ $/วัน</label><input type="number" id="weSales" value="3000" oninput="calc()"></div>
        </div>
        <div class="row2">
          <div class="field"><label>วันธรรมดา/สัปดาห์</label><input type="number" id="wdDays" value="4" oninput="calc()"></div>
          <div class="field"><label>เสาร์-อาทิตย์/สัปดาห์</label><input type="number" id="weDays" value="2" oninput="calc()"></div>
        </div>
        <div class="field"><label>ราคาเฉลี่ย/หัว $ <span class="hint">ใช้ประเมินจำนวนลูกค้า</span></label><input type="number" id="check" value="35" oninput="calc()"></div>
      </div>

      <div class="card">
        <h2>ต้นทุน</h2>
        <div class="slideField">
          <div class="top"><span>ต้นทุนวัตถุดิบ (food cost)</span><b id="foodLab">32%</b></div>
          <input type="range" id="foodPct" min="20" max="45" step="0.5" value="32" oninput="calc()">
        </div>
        <div class="slideField">
          <div class="top"><span>ค่าธรรมเนียมบัตร (% ของยอด)</span><b id="cardLab">2.2%</b></div>
          <input type="range" id="cardPct" min="0" max="4" step="0.1" value="2.2" oninput="calc()">
        </div>
        <div class="field"><label>ค่าคงที่/เดือน (เช่า+ฯลฯ)</label><input type="number" id="fixed" value="13120" oninput="calc()"></div>
        <details>
          <summary>รายละเอียดค่าคงที่ (ปรับแยกได้)</summary>
          <div style="margin-top:10px">
            <div class="row2">
              <div class="field"><label>เช่า (Rent)</label><input type="number" id="fx_rent" value="5600" oninput="sumFixed()"></div>
              <div class="field"><label>CAM/NNN</label><input type="number" id="fx_cam" value="1500" oninput="sumFixed()"></div>
            </div>
            <div class="row2">
              <div class="field"><label>ค่าน้ำไฟ</label><input type="number" id="fx_util" value="2500" oninput="sumFixed()"></div>
              <div class="field"><label>เน็ต/โทร</label><input type="number" id="fx_net" value="200" oninput="sumFixed()"></div>
            </div>
            <div class="row2">
              <div class="field"><label>ประกัน</label><input type="number" id="fx_ins" value="1200" oninput="sumFixed()"></div>
              <div class="field"><label>Toast POS</label><input type="number" id="fx_pos" value="200" oninput="sumFixed()"></div>
            </div>
            <div class="row2">
              <div class="field"><label>Payroll SW</label><input type="number" id="fx_pay" value="120" oninput="sumFixed()"></div>
              <div class="field"><label>ขยะ/ดักไขมัน</label><input type="number" id="fx_trash" value="400" oninput="sumFixed()"></div>
            </div>
            <div class="row2">
              <div class="field"><label>บัญชี/CPA</label><input type="number" id="fx_cpa" value="500" oninput="sumFixed()"></div>
              <div class="field"><label>การตลาด</label><input type="number" id="fx_mkt" value="600" oninput="sumFixed()"></div>
            </div>
            <div class="field"><label>เบ็ดเตล็ด</label><input type="number" id="fx_misc" value="300" oninput="sumFixed()"></div>
          </div>
        </details>
      </div>

      <div class="card">
        <h2>คน / ค่าแรง (เฉพาะพนักงานจ้าง)</h2>
        <div class="toggle" id="laborToggle">
          <button id="tManual" class="on" onclick="setLaborMode('manual')">ใส่ชั่วโมงเอง</button>
          <button id="tGrid" onclick="setLaborMode('grid')">ตามกะ (ไทยนคร)</button>
        </div>

        <div id="manualBox">
          <div class="field"><label>ชั่วโมงแรงงานจ้าง/สัปดาห์ <span class="hint">เช่น 3 คน × 40 ชม. = 120</span></label><input type="number" id="hoursWk" value="120" oninput="calc()"></div>
        </div>

        <div id="gridBox" style="display:none">
          <table class="grid">
            <tr><th></th><th>คน</th><th>ชม./กะ</th></tr>
            <tr><td>หน้าบ้าน เช้า · จ-พฤ</td><td><input type="number" id="g_amP_wd" value="2" oninput="calc()"></td><td rowspan="3"><input type="number" id="g_amHrs" value="6" oninput="calc()"></td></tr>
            <tr><td>หน้าบ้าน เช้า · ศ-อา</td><td><input type="number" id="g_amP_we" value="3" oninput="calc()"></td></tr>
            <tr style="height:0"><td style="padding:0"></td><td style="padding:0"></td></tr>
            <tr><td>หน้าบ้าน เย็น · จ-พฤ</td><td><input type="number" id="g_pmP_wd" value="3" oninput="calc()"></td><td rowspan="2"><input type="number" id="g_pmHrs" value="7" oninput="calc()"></td></tr>
            <tr><td>หน้าบ้าน เย็น · ศ-อา</td><td><input type="number" id="g_pmP_we" value="4" oninput="calc()"></td></tr>
            <tr><td>บัสเซอร์ · ศ-อา</td><td><input type="number" id="g_busP" value="1" oninput="calc()"></td><td><input type="number" id="g_busHrs" value="5" oninput="calc()"></td></tr>
            <tr><td>ครัว · ทุกวัน</td><td><input type="number" id="g_kitP" value="5" oninput="calc()"></td><td><input type="number" id="g_kitHrs" value="9" oninput="calc()"></td></tr>
          </table>
          <div class="cap" id="gridHrs">ชั่วโมงรวม: — /สัปดาห์ · คนบนเพย์โรลประมาณ —</div>
        </div>

        <div class="row2" style="margin-top:12px">
          <div class="field"><label>ค่าแรง $/ชม.</label><input type="number" id="wage" value="18" oninput="calc()"></div>
          <div class="field"><label>ภาระนายจ้าง %</label><input type="number" id="burden" value="13" oninput="calc()"></div>
        </div>
      </div>

      <div class="card">
        <h2>เจ้าของ / ภาษี (LLC)</h2>
        <div class="row2">
          <div class="field"><label>จำนวนหุ้นส่วน</label><input type="number" id="partners" value="3" oninput="calc()"></div>
          <div class="field"><label>กันภาษี %</label><input type="number" id="taxPct" value="30" oninput="calc()"></div>
        </div>
        <div class="cap">draw = แบ่งกำไรหลังกันภาษี · ภาษีคิดบนกำไรทั้งก้อนไม่ว่าจะถอนหรือไม่</div>
      </div>
    </div>

    <!-- ============ RESULTS ============ -->
    <div class="results">
      <div class="res-hero">
        <div class="lab">Draw ต่อคน / เดือน</div>
        <div class="draw" id="o_draw">$0 <small id="o_drawYr">/ ปี $0</small></div>
        <div class="total">หลังกันภาษี · แบ่ง <span id="o_partners">3</span> คน</div>
      </div>

      <div class="card">
        <h2>เงินไปไหนบ้าง (ต่อ $1 ยอดขาย)</h2>
        <div class="bar" id="bar"></div>
        <div class="legend">
          <span><i style="background:#c97b5a"></i>วัตถุดิบ</span>
          <span><i style="background:#8a6d1f"></i>ค่าแรง</span>
          <span><i style="background:#4a7fa5"></i>ค่าคงที่</span>
          <span><i style="background:#6b6b6b"></i>บัตร</span>
          <span><i style="background:#5BBF7B"></i>กำไร</span>
        </div>
      </div>

      <div class="card">
        <h2>สรุปรายเดือน</h2>
        <div class="lines">
          <div class="l"><span>ยอดขาย <span class="pill" id="o_perday">~$0/วัน</span></span><b id="o_sales">$0</b></div>
          <div class="l"><span>− วัตถุดิบ</span><b class="neg" id="o_cogs">$0</b></div>
          <div class="l"><span>− ค่าบัตร</span><b class="neg" id="o_card">$0</b></div>
          <div class="l"><span>− ค่าแรงจ้าง <span class="pill" id="o_laborPct">0%</span></span><b class="neg" id="o_labor">$0</b></div>
          <div class="l"><span>− ค่าคงที่</span><b class="neg" id="o_fixed">$0</b></div>
          <div class="l tot"><span>= เงินสดก่อน draw &amp; ภาษี</span><b class="pos" id="o_opcash">$0</b></div>
          <div class="l"><span>margin</span><b id="o_margin">0%</b></div>
          <div class="l"><span>− กันภาษี</span><b class="neg" id="o_tax">$0</b></div>
          <div class="l tot"><span>= ถอนได้ (distributable)</span><b class="pos" id="o_dist">$0</b></div>
        </div>
        <div class="cap" id="o_covers"></div>
      </div>

      <div class="card" style="border-color:rgba(176,141,60,0.4)">
        <div class="note" id="o_advice"></div>
        <div class="note" style="margin-top:8px;opacity:.8">* ข้อมูลทั่วไป ไม่ใช่คำแนะนำภาษี/กฎหมาย — ยืนยันกับ CPA</div>
      </div>
    </div>
  </div>
</div>

<script>
var laborMode='manual';
var f$=function(v){return '$'+Math.round(v).toLocaleString('en-US');};
var pct=function(v){return (v*100).toFixed(1)+'%';};
var num=function(id){var e=document.getElementById(id);var v=parseFloat(e.value);return isNaN(v)?0:v;};

function setLaborMode(m){
  laborMode=m;
  document.getElementById('manualBox').style.display = m==='manual'?'block':'none';
  document.getElementById('gridBox').style.display   = m==='grid'?'block':'none';
  document.getElementById('tManual').className = m==='manual'?'on':'';
  document.getElementById('tGrid').className   = m==='grid'?'on':'';
  calc();
}

function sumFixed(){
  var ids=['fx_rent','fx_cam','fx_util','fx_net','fx_ins','fx_pos','fx_pay','fx_trash','fx_cpa','fx_mkt','fx_misc'];
  var t=0; ids.forEach(function(i){t+=num(i);});
  document.getElementById('fixed').value=Math.round(t);
  calc();
}

function gridHours(){
  var wdDays=num('wdDays'), weDays=num('weDays');
  var amHrs=num('g_amHrs'), pmHrs=num('g_pmHrs'), busHrs=num('g_busHrs'), kitHrs=num('g_kitHrs');
  var foh = (num('g_amP_wd')*amHrs + num('g_pmP_wd')*pmHrs)*wdDays
          + (num('g_amP_we')*amHrs + num('g_pmP_we')*pmHrs + num('g_busP')*busHrs)*weDays;
  var kit = num('g_kitP')*kitHrs*(wdDays+weDays);
  var shifts = (num('g_amP_wd')+num('g_pmP_wd'))*wdDays
             + (num('g_amP_we')+num('g_pmP_we')+num('g_busP'))*weDays
             + num('g_kitP')*(wdDays+weDays);
  return {hours:foh+kit, shifts:shifts};
}

function calc(){
  var wdSales=num('wdSales'), weSales=num('weSales'), wdDays=num('wdDays'), weDays=num('weDays');
  var weeklySales = wdSales*wdDays + weSales*weDays;
  var monthly = weeklySales*4.333;
  var foodPct=num('foodPct')/100, cardPct=num('cardPct')/100;
  document.getElementById('foodLab').textContent=num('foodPct')+'%';
  document.getElementById('cardLab').textContent=num('cardPct')+'%';

  var hoursWk;
  if(laborMode==='grid'){
    var g=gridHours(); hoursWk=g.hours;
    document.getElementById('gridHrs').textContent=
      'ชั่วโมงรวม: '+Math.round(g.hours)+' /สัปดาห์ · คนบนเพย์โรลประมาณ '+(g.shifts/5).toFixed(1)+' คน';
  } else { hoursWk=num('hoursWk'); }
  var laborMo = hoursWk*num('wage')*(1+num('burden')/100)*4.333;

  var cogs=monthly*foodPct, card=monthly*cardPct, fixed=num('fixed');
  var opCash = monthly - cogs - card - laborMo - fixed;
  var margin = monthly>0 ? opCash/monthly : 0;
  var laborPctSales = monthly>0 ? laborMo/monthly : 0;
  var taxPct=num('taxPct')/100;
  var tax = Math.max(0,opCash)*taxPct;
  var dist = opCash - tax;
  var partners=Math.max(1,num('partners'));
  var drawPer = dist/partners;

  // outputs
  var avgDay = monthly/30.4;
  document.getElementById('o_sales').textContent=f$(monthly);
  document.getElementById('o_perday').textContent='~'+f$(avgDay)+'/วัน';
  document.getElementById('o_cogs').textContent='−'+f$(cogs);
  document.getElementById('o_card').textContent='−'+f$(card);
  document.getElementById('o_labor').textContent='−'+f$(laborMo);
  document.getElementById('o_laborPct').textContent=pct(laborPctSales);
  document.getElementById('o_fixed').textContent='−'+f$(fixed);
  document.getElementById('o_opcash').textContent=f$(opCash);
  document.getElementById('o_margin').textContent=pct(margin);
  document.getElementById('o_tax').textContent='−'+f$(tax);
  document.getElementById('o_dist').textContent=f$(dist);
  document.getElementById('o_draw').innerHTML=f$(drawPer)+' <small>/ ปี '+f$(drawPer*12)+'</small>';
  document.getElementById('o_partners').textContent=partners;

  // bar (share of sales)
  function w(v){return monthly>0?Math.max(0,v/monthly*100):0;}
  var profSeg=Math.max(0,margin*100);
  document.getElementById('bar').innerHTML=
    '<span style="width:'+w(cogs)+'%;background:#c97b5a"></span>'+
    '<span style="width:'+w(laborMo)+'%;background:#8a6d1f"></span>'+
    '<span style="width:'+w(fixed)+'%;background:#4a7fa5"></span>'+
    '<span style="width:'+w(card)+'%;background:#6b6b6b"></span>'+
    '<span style="width:'+profSeg+'%;background:#5BBF7B"></span>';

  // covers
  var check=num('check');
  if(check>0){
    document.getElementById('o_covers').textContent=
      'ลูกค้าโดยประมาณ: วันธรรมดา ~'+Math.round(wdSales/check)+' คน/วัน · เสาร์-อาทิตย์ ~'+Math.round(weSales/check)+' คน/วัน  (ที่นั่ง ~100 + patio)';
  } else { document.getElementById('o_covers').textContent=''; }

  // advice
  var adv;
  if(opCash<0){ adv='⚠️ ขาดทุน — ยอดยังไม่พอคลุมต้นทุน ลองเพิ่มยอด/ลดค่าแรงหรือค่าคงที่'; }
  else if(drawPer<3000){ adv='ช่วงยอดน้อย: ถอนแต่พอดี เก็บ cushion จากทุนสำรอง รอยอดไต่ขึ้นก่อนถอนเต็ม'; }
  else if(laborPctSales>0.30){ adv='ค่าแรงเกิน 30% ของยอด — สูงไป ลองจัดกะให้ตรงกับช่วงพีค (เสาร์-อาทิตย์) หรือเพิ่มยอด/หัว'; }
  else { adv='สุขภาพดี: ค่าแรง '+pct(laborPctSales)+' · margin '+pct(margin)+' กันภาษีแล้วถอนได้ '+f$(drawPer)+'/คน/เดือน'; }
  document.getElementById('o_advice').textContent=adv;
}

function setVal(id,v){var e=document.getElementById(id); if(e) e.value=v;}
function preset(name){
  document.querySelectorAll('.preset').forEach(function(b){b.classList.remove('active');});
  if(name==='soft'){
    setVal('wdSales',3000);setVal('weSales',3000);setVal('wdDays',4);setVal('weDays',2);
    setLaborMode('manual'); setVal('hoursWk',120);
    document.querySelectorAll('.preset')[0].classList.add('active');
  } else if(name==='thainakorn'){
    setVal('wdSales',6000);setVal('weSales',12000);setVal('wdDays',4);setVal('weDays',3);
    setVal('g_amP_wd',2);setVal('g_pmP_wd',3);setVal('g_amP_we',3);setVal('g_pmP_we',4);setVal('g_busP',1);setVal('g_kitP',5);
    setVal('g_amHrs',6);setVal('g_pmHrs',7);setVal('g_busHrs',5);setVal('g_kitHrs',9);
    setLaborMode('grid');
    document.querySelectorAll('.preset')[1].classList.add('active');
  } else if(name==='mid'){
    setVal('wdSales',4000);setVal('weSales',7000);setVal('wdDays',4);setVal('weDays',3);
    setLaborMode('manual'); setVal('hoursWk',320);
    document.querySelectorAll('.preset')[2].classList.add('active');
  }
  calc();
}

// init
preset('soft');
</script>
</body>
</html>
`;
