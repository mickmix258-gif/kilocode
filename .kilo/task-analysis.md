# Task Analysis — Feature Parity Plan (Kilo Code VS Code Extension)

สร้างโดย: Kilo (Software Engineer)
วันที่: 2026-10-18
แหล่งข้อมูล: packages/kilo-vscode/README.md + docs/ ทั้งหมด (Feature Parity Plan)
หมายเหตุ: ข้ามรูปภาพและคลิปวิดีโอทั้งหมดตามที่ร้องขอ (ระบบไม่เสถียร)

## สรุปภาพรวม

| หมวดหมู่ | จำนวนงาน | เวลารวมโดยประมาณ (ชั่วโมง) |
|---|---|---|
| P0 (วิกฤต) | 1 | 8 |
| P1 (สูง) | 15 | 198 |
| P2 (กลาง) | 17 | 280 |
| P3 (ต่ำ) | 8 | 128 |
| **รวมทั้งหมด** | **41** | **614** |

เวลาประมาณทั้งหมด: **614 ชั่วโมง** (ประมาณ 77 วันทำการ 8 ชั่วโมง)

---

## ตารางงานทั้งหมด เรียงจากเวลาน้อยสุดไปมาก

| # | งาน | หมวดหมู่ | ความสำคัญ | เวลา (ชม.) | รายละเอียดงานที่เหลือ |
|---|---|---|---|---|---|
| 1 | Profile View Missing Back Button | UI Polish | P2 | 4 | ประเมินว่า editor panel แก้ปัญหาแล้วหรือยัง ถ้าไม่ เพิ่มปุ่ม back ใน header ของ Profile view ให้ตรงกับรูปแบบ Settings view |
| 2 | Approval Box Missing Full Path | UI Polish | P1 | 6 | แสดง path แบบเต็มเสมอสำหรับคำขอ permission นอก workspace สำหรับ path ใน workspace ใช้ relative path ได้แต่ต้องมีตัวบ่งชี้ 시각 ถ้าอยู่ outside workspace ห้ามย่อ ให้แสดง absolute path เต็ม อาจตัดต้น path ที่ยาวมากด้วย ellipsis |
| 3 | Autocomplete Settings Link Broken | Error Handling | P1 | 6 | แก้ไขลิงก์ "settings" ในข้อความแจ้งเตือนว่า autocomplete เสีย ให้ไปยัง Autocomplete settings tab ตรวจสอบว่าทำไม model selector แสดง "ไม่ได้เลือก model" โดยค่าเริ่มต้น เพิ่ม fallback ที่สมเหตุสมผล ตรวจสอบสถานะ "autocomplete broken" ว่าถูกตรวจจับและเคลียร์อย่างถูกต้อง |
| 4 | Remember Last Model Choice | Features | P2 | 6 | เมื่อเปลี่ยน model ให้บันทึก choice ลง globalState ด้วยคีย์ 'lastModel' เมื่อสร้าง session ใหม่ ให้ preselect model ที่ใช้ล่าสุดผ่าน globalState.get('lastModel') fallback ไปยัง default อย่างราบรื่นถ้า model ที่บันทึกไว้ไม่มีอยู่แล้ว |
| 5 | /init Pre-Commit Secret Check | CLI Side | P2 | 6 | ในคำสั่ง /init ของ CLI หลังจากเขียนไฟล์ init แล้ว ให้ตรวจสอบว่ารีโปมี .pre-commit-config.yaml ที่มี secret scanning hook หรือไม่ มี .git/hooks/pre-commit หรือไม่ มี .secrets.baseline ของ detect-secrets หรือไม่ ถ้าไม่มีให้แนะนำพร้อมลิงก์ไปยัง detect-secrets หรือ gitleaks เสนอติดตั้ง detect-secrets เป็นส่วนหนึ่งของ init flow ได้ |
| 6 | Pre-Release Switch CPU Spike | Error Handling | P0 | 8 | ตรวจสอบและวัด CPU usage ตอนสลับ release <> pre-release ตรวจสอบว่าทั้งสองเวอร์ชันพยายามสร้าง kilo serve พร้อมกันทำให้ port/race conflict หรือไม่ ตรวจสอบว่า deactivate() หยุด server process ก่อนเวอร์ชันใหม่เริ่มทำงาน ตรวจสอบ file lock conflict บน state ที่แชร์กัน (เช่น agent-manager.json, CLI config) |
| 7 | Markdown Rendering Improvements | UI Polish | P1 | 8 | เพิ่ม CSS rules สำหรับ heading h1-h6 ให้มีขนาดฟอนต์ น้ำหนัก และระยะแนวตั้งที่แตกต่างจากข้อความธรรมดา จำกัดขอบเขตเฉพาะพื้นที่เนื้อหา markdown ตรวจสอบทุก theme (light, dark, high-contrast) ตรวจสอบ bullet list, numbered list, blockquote, horizontal rule, bold/italic ด้วย |
| 8 | HTTP Request Timeouts | Infrastructure | P1 | 8 | เพิ่ม request timeout ที่คอนฟิกได้ (ค่าเริ่มต้น 60s) รอบ SDK calls ใน KiloProvider เพิ่ม connect timeout ที่สั้นกว่าที่เป็นไปได้ (ค่าเริ่มต้น 10s) ตรวจสอบว่า timeout ถูกเคลียร์เมื่อตอบสำเร็จ (ไม่มี timer รั่ว) |
| 9 | Plan Mode Over-Prompting | CLI Side | P1 | 8 | ตรวจทาน Plan mode system prompt ว่ามีภาษาที่กระตุ้นให้ agent เปลี่ยนไปทำ implementation หรือไม่ prompt ต้องชัดเจนว่าใน Plan mode งานของ agent คือช่วยสร้างและ refine plan เท่านั้น ไม่ใช่ implement "Should I implement this?" ควรถามสูงสุดครั้งเดียว หลังจาก plan ดูเสร็จแล้ว ประสานงานกับทีมเกี่ยวกับพฤติกรรม Plan mode ที่ถูกต้องก่อนเปลี่ยน prompt |
| 10 | Chat Input Overflow on Narrow Sidebar | UI Polish | P2 | 8 | ทำให้ chat input toolbar responsive: wrap controls ไปยังแถวที่สองเมื่อ sidebar แคบ ปุ่ม send ตองมองเห็นเสมอและยึดอยู่มุมขวาล่าง ใช้ CSS flex-wrap: wrap หรือ container queries / ResObserver ทดสอบที่ความกว้าง sidebar ประมาณ 200px, 280px, 350px |
| 11 | Expandable MCP Tools | Features | P2 | 8 | ทำให้ MCP tool call rows ขยายได้ ตรงกับพฤติกรรม expand/collapse ของ tool ทั่วไป มุมมองที่ขยายควรแสดง: tool name, MCP server name, input arguments (JSON), tool output/result ใช้รูปแบบ UI เดียวกับ tool ทั่วไป (chevron icon, collapsible section) |
| 12 | Session Preview Improvements | Features | P2 | 8 | ประเมินทางเลือก: แสดงข้อความแรกเป็น subtitle, ปรับปรุงการสร้างชื่อ, แสดงจำนวนข้อความ/timestamp ตรวจสอบการ์ด "recent sessions" บนหน้าจอเริ่มต้น/โฮม screen แนะนำให้ทำ user testing เพื่อหาวิธีที่มีประโยชน์ที่สุด |
| 13 | Dedicated Output Channel | Infrastructure | P2 | 8 | สร้าง vscode.window.createOutputChannel("Kilo Code") ระหว่าง activation สร้าง logging utility แบบรวมศูนย์ที่มี log levels (debug, info, warn, error) ส่งข้อความ log ทั้งหมดที่ขึ้นต้นด้วย [Kilo New] ไปยัง channel นี้ Dispose ตอน deactivation ย้าย console.log("[Kilo New] ...") ที่มีอยู่ทั้งหมดไปใช้ logger |
| 14 | Show Changelog on Update | Infrastructure | P3 | 8 | เมื่อ activate ให้เปรียบเทียบเวอร์ชันปัจจุบันกับเวอร์ชันล่าสุดที่บันทึกไว้ใน globalState ถ้าเวอร์ชันเปลี่ยน ให้แสดง notification พร้อมตัวเลือก "What's New" และ "Dismiss" อัปเดตเวอร์ชันที่บันทึกไว้หลังจากแสดงแล้ว ไม่แสดงตอนติดตั้งครั้งแรก |
| 15 | Settings Sync Integration | Non-Agent | P3 | 8 | ลงทะเบียน allowlist ของสถานะ/การตั้งค่า extension สำหรับ VS Code Settings Sync กำหนดว่าตั้งค่าใดควร sync (extension settings ใน settings.json เทียบกับ CLI config) เลือก mirror ส่วนหนึ่งของการตั้งค่าเข้าไปใน CLI config ได้ |
| 16 | Extension View Doesn't Refresh on Update | Error Handling | P1 | 10 | Subscribe กับ vscode.extensions.onDidChange เพื่อตรวจจับการอัปเดต extension เมื่อ Kilo Code อัปเดต ให้ force-reload webview panel (dispose และสร้างใหม่ หรือส่งข้อความ reload) ตรวจสอบว่า panel ถูก dispose และสร้างใหม่อย่างเหมาะสมเมื่อ extension host restart |
| 17 | VSCode Error Notifications | Infrastructure | P1 | 10 | แสดง showErrorMessage() เมื่อ CLI binary หายหรือ server เริ่มไม่สำเร็จ แสดง showWarningMessage() เมื่อ SSE connection หลุด (มีปุ่ม "Retry") หลีกเลี่ยง notification spam ด้วยการ throttle หรือ deduplicate ข้อผิดพลาดที่ซ้ำกัน |
| 18 | Special Content Types | Chat UI | P1 | 12 | เพิ่ม copy button บน error cards (ข้อความ error แสดงอยู่แล้วแต่ไม่มีปุ่ม copy) เพิ่ม dedicated MCP tool/resource rows ที่มีการ render เฉพาะ (เกินกว่า generic fallback) เพิ่ม "open markdown preview" button (เปิด markdown ที่ render แล้วใน VS Code preview pane) |
| 19 | Propagate CLI Errors to UI | Error Handling | P1 | 12 | ดักจับ CLI error output (stderr) ใน ServerManager / KiloConnectionService แสดง VS Code error notification สำหรับ critical/startup errors ฉีดข้อความ error เข้าไปใน chat UI เป็น system message สำหรับ mid-session errors ตรวจสอบว่า CLI's error SSE events ถูกส่งต่อไปยัง webview และ render แยกแยะ startup errors และ runtime errors |
| 20 | CLI Startup Errors | Error Handling | P1 | 12 | ตรวจจับ CLI process exit แบบไม่คาดคิดก่อนที่ port จะถูกประกาศ (process.on('exit', ...) ใน ServerManager) บันทึก last N lines ของ stderr แสดง error notification พร้อมปุ่ม "Show Logs" และ "Retry" เพิ่มสถานะ 'failed' ลงใน ConnectionState สำหรับ config ที่ผิดรูปแบบ: แยกวิเคราะห์ error และแสดงคำแนะนำที่อ่านออกได้ง่าย |
| 21 | Architect Mode / Plan Files | CLI Side | P2 | 12 | หลังจาก plan สรุปแล้ว ให้เขียนเป็นไฟล์ .md ไปยังโฟลเดอร์ /plans ใน project root ชื่อไฟล์อาจอิงจากชื่อ plan หรือ timestamp ทำเพิ่มเติมจากที่เก็บไว้ใน .opencode/ ภายใน หรือเพิ่มปุ่ม "Export plan" ใน Plan mode UI ที่บันทึกแผนปัจจุบันไปยัง /plans/ สร้าง /plans/ อย่างปลอดภัย (อย่าเขียนทับไฟล์ที่มีอยู่โดยไม่มีการยืนยันจากผู้ใช้) |
| 22 | Publish to OpenVSX | Infrastructure | P3 | 12 | สร้าง OpenVSX publisher account เพิ่มขั้นตอน ovsx publish ลงใน CI/CD pipeline หลังจากเผยแพร่ไปยัง VS Code Marketplace แล้ว ตั้งค่า OpenVSX token เป็น CI secret ทดสอบการ publish ด้วยตนเองก่อน |
| 23 | Settings UI | Non-Agent | P1 | 16 | สร้าง Terminal tab (ขณะนี้แสดง "Not implemented") สร้าง Prompts tab (ขณะนี้แสดง "Not implemented") สร้าง Workflows subtab (ภายใน AgentBehaviour settings) ปัจจุบันแสดง <Placeholder> โดยไม่มีฟังก์ชันการทำงาน |
| 24 | Mermaid Diagram Features | Chat UI | P2 | 16 | Mermaid rendering สำหรับ fenced mermaid code blocks ปุ่ม "Fix with AI" ปุ่ม copy เปิดเป็นไฟล์ PNG render แบบเว็บเท่านั้น สำหรับ "Fix with AI" ใช้ CLI |
| 25 | Rules & Workflows (Non-Agent) | Non-Agent | P2 | 16 | สร้าง workflow management UI กำหนดรูปแบบและการดำเนินการของ workflow UI สำหรับเรียกดู .kilocode/rules/ และแหล่งที่มาของ rule ที่คล้ายกัน กำหนด CLI endpoints สำหรับ workflow CRUD |
| 26 | Skills System | Non-Agent | P2 | 16 | ผสานรวม skill execution runtime ใน extension ค้นพบ skills (เรียกดู skills ที่มีอยู่) hot-reload เมื่อไฟล์ skill มีการเปลี่ยนแปลง config UI สำหรับ paths/URLs มีอยู่แล้ว |
| 27 | Rules & Workflows Sub-Tabs | Agent Behaviour | P2/P3 | 16 | Rules: เพิ่มคำอธิบายประกอบลิงก์ไปยัง docs แยก global vs workspace ส่วน rules เพิ่มปุ่มเปิด/ปิดต่อ rule เพิ่มปุ่มสร้างไฟล์ rule ใหม่ เพิ่มส่วนแสดงแหล่ง rule ที่ค้นพบโดยอัตโนมัติ Workflows: แทนที่ placeholder ด้วยการจัดการ workflow จริง กำหนดการ map กับ CLI จัดการไฟล์ workflow เพิ่มคำอธิบายประกอบ |
| 28 | File Attachments | Features | P2 | 16 | เพิ่มปุ่มแนบไฟล์ใน chat input toolbar (ไอคอนหนีบกระดาษหรือคล้ายกัน) รองรับ drag-and-drop ของไฟล์ที่ไม่ใช่รูปภาพลงบนพื้นที่ chat input รองรับ file picker dialog ผ่านปุ่ม สำหรับไฟล์ข้อความ: อ่านเนื้อหาและรวมเป็น text part ในข้อความ สำหรับไฟล์ไบนารี: แสดงข้อความแจ้งว่าไม่รองรับ แสดงไฟล์ที่แนบเป็น chips/tags เหนือ input พร้อมปุ่มลบ จำกัดขนาดไฟล์แนบพร้อมข้อผิดพลาดที่ชัดเจนถ้าเกินขนาด |
| 29 | Auto-Purge | Non-Agent | P3 | 16 | ทำความสะอาดตามกำหนดการของ storage เก่าสำหรับ task/history เพื่อป้องกันการเติบโตของดิสก์แบบควบคุมไม่ได้ ตัดสินใจว่า storage ownership เป็นของ CLI server หรือ extension แล้ว implement purge ตามนั้น กำหนดระยะเวลาการเก็บรักษาที่คอนฟิกได้ ลบอย่างปลอดภัยพร้อมการยืนยันจากผู้ใช้สำหรับ bulk purge |
| 30 | Message Editing & Management | Chat UI | P1 | 20 | แก้ไขข้อความผู้ใช้แบบ inline (พร้อมคุณสมบัติ chat input ทั้งหมด — mode selector, image attachments, cancel/save) ลบข้อความผู้ใช้จากบทสนทนา คลิกเพื่อแก้ไขบนข้อความ แสดง timestamp บนข้อความ ส่งข้อความก่อนหน้าซ้ำผ่านปุ่มลูกศรขึ้น แปลง edit/delete เป็น CLI session operations (fork-from-message + re-run) |
| 31 | MCP & MCP Hub | Non-Agent | P1 | 20 | เพิ่มควบคุม add/edit MCP server ใน settings UI อนุญาต/ปิดใช้งาน tool ต่อ server การเชื่อมต่ออัตโนมัติใหม่และประวัติข้อผิดพลาด MCP Hub สำหรับค้นพบ MCP servers ที่พร้อมใช้งาน CLI จัดการ MCP lifecycle ส่วน extension จัดเตรียม config UI |
| 32 | Modes / Agents | Agent Behaviour | P2 | 20 | ฟิลด์ When to Use: เพิ่ม text area สำหรับ orchestrator routing hints (ถ้า CLI รองรับ) ระบบ prompt preview: เพิ่มปุ่มดู system prompt เต็มรูปแบบ — ต้องการ CLI endpoint ที่ส่งคืน prompt ที่ประกอบแล้วสำหรับ agent Import/Export: เพิ่มการนำเข้า (จากไฟล์) และส่งออก (ไปยังไฟล์) สำหรับคำจำกัดความของ agent/mode Default variant ต่อ agent: เปิดเผย agent[name].variant สำหรับค่าเริ่มต้นความพยายามในการคิดอย่างต่อเนื่อง Hidden/disable toggles: เพิ่มควบคุมการมองเห็นของ agent |
| 33 | MCP Servers Sub-Tab | Agent Behaviour | P2 | 20 | เพิ่ม dialog สำหรับสร้าง MCP server ใหม่: ฟอร์มกำหนดชื่อ server, transport type (stdio/SSE), command+args หรือ URL, environment variables เขียนลง CLI config ผ่าน updateConfig() แก้ไข MCP server ที่มีอยู่ ปุ่ม restart/refresh: ต่อ server และ "refresh all" ต้องการ endpoint ของ CLI สำหรับการรีสตาร์ท MCP servers ปุ่มแก้ไขไฟล์ config: ลิงก์ด่วนเพื่อเปิด global/project MCP config ใน editor |
| 34 | Checkpoint & Task Management | Chat UI | P1 | 24 | สร้าง checkpoint restore dialogs สร้าง checkpoint navigation menu / timeline ดู diff ระหว่าง checkpoints ปุ่ม "See New Changes" เพื่อดู git diffs สำหรับ task ที่เสร็จแล้ว ผสานรวมกับ CLI session undo/redo/fork operations พิจารณา reuse kilo-ui's MessageNav component ประเมินว่า CLI session undo/redo/revert ตรงกับโมデル checkpoint ของ Kilo หรือไม่ หรือว่า extension ต้องมี implementation บน git ของตัวเอง |
| 35 | Authentication & Enterprise Enforcement | Non-Agent | P1 | 24 | แบบ dropdown เลือกระหว่าง org หรือ personal account ส่งการเลือกผ่าน kilo serve ไปยัง backend เมื่อใช้ Kilo gateway Organization feature flags (จำกัดฟีเจอร์ตาม org plan/tier) MDM policy enforcement (นโยบายอุปกรณ์ที่จัดการ, ควบคุมของ admin ระดับองค์กร, การบังคับใช้ข้อจำกัด) CLI จัดการ auth ของตัวเอง extension จัดการ org/MDM |
| 36 | Code Reviews | Non-Agent | P2 | 24 | โหมด "Review Mode" ในเครื่องสำหรับ AI review ของการเปลี่ยนแปลงที่ยังไม่ได้ commit การรีวิว เทียบกับฐานที่มาของ_branch (main/master/develop detection) AI review อัตโนมัติเมื่อ PR เปิด/อัปเดต (cloud workflow) ผสานรวม VS Code review UX ใช้ CLI review templates/prompts ที่มีอยู่แล้วที่เป็นไปได้ |
| 37 | Browser Session Controls | Chat UI | P3 | 24 | ควบคุม browser session ในแชท (เริ่ม/หยุด/นำทาง) ปุ่ม replay และควบคุมการกระทำ ดูสกรีนช็อตภายในข้อความแชท การ render browser tool เฉพาะ (ปัจจุบันตกไปอยู่ในการแสดงผล generic MCP tool) |
| 38 | Contribution Tracking | Non-Agent | P3 | 24 | ติดตามการแก้ไขที่ช่วยโดย AI สำหรับการรายงานระดับองค์กร การ diff ที่คำนึงถึงรูปแบบ การ hash/ลายนิ้วมือบรรทัด การจัดการ Token/JWT สำหรับ attribution APIs รายงาน UIanchors อยู่ใน kilocode-legacy repo ไม่ใช่ใน extension นี้ |
| 39 | Speech-to-Text | Non-Agent | P3 | 24 | การจับเสียงจากไมโครโฟนใน webview การผสานรวม STT แบบสตรีมมิ่ง ปุ่มป้อนข้อมูลด้วยเสียงในพื้นที่พร้อมท์ กำหนด STT provider (browser API, CLI-compatible, หรือบริการภายนอก)anchors อยู่ใน kilocode-legacy repo |
| 40 | Cloud Task Support | Non-Agent | P2 | 40 | อัปโหลด/ซิงก์ session ในเครื่องขึ้น cloud ซิงก์แบบเรียลไทม์ระหว่างอุปกรณ์ การแก้ไขความขัดแย้งเมื่อ session ถูกแก้ไขบนอุปกรณ์หลายเครื่อง ต้องใช้ Kilo cloud API + CLI ส่วน extension จัดเตรียม UI |
| 41 | Codebase Indexing & Semantic Search | Non-Agent | P2 | 40 | การจัดทำดัชนีแบบเวกเตอร์พร้อม embeddings (ในเครื่องและ/หรือ cloud) ค้นหเชิงความหมายเหนือคลังรหัส การอัปเดตแบบเพิ่มเติมผ่าน file watchers และ hashing embedding providers และ storage backends หลายราย การผสานรวมกับ CLI grep/glob ที่มีอยู่สำหรับ hybrid searchanchors อยู่ใน kilocode-legacy repo |

---

## คำแนะนำลำดับความสำคัญในการทำงาน

1. **สัปดาห์ที่ 1 — P0 และ P1 ที่ใช้เวลาน้อยก่อน:** งาน #1-11, #16-22 (แก้ปัญหาวิกฤตและข้อผิดพลาดร้ายแรงที่ส่งผลกระทบต่อผู้ใช้ทันที)
2. **สัปดาห์ที่ 2-3 — P1 ที่เหลือ + P2 สำคัญ:** งาน #23-33 (การตั้งค่า UI, แชท UI, MCP, modes/agents)
3. **สัปดาห์ที่ 4-6 — P2 ขนาดกลางและใหญ่:** งาน #34-39 (checkpoint, auth, code reviews, browser, contribution tracking, STT)
4. **สัปดาห์ที่ 7-8 — P3 และโครงสร้างพื้นฐานขนาดใหญ่:** งาน #40-41 (cloud task, semantic search) รวมถึง P3 ที่เหลือ

---

## หมายเหตุเกี่ยวกับการจัดเก็บข้อมูล

ระบบนี้ทำงานในสภาพแวดล้อม sandbox ชั่วคราว จึงไม่สามารถเขียนข้อมูลตรงไปยังบัญชี Kilo หรือเซิร์ฟเวอร์ส่วนตัวของคุณได้โดยตรง ไฟล์ทั้งหมดด้านล่างนี้ถูกสร้างขึ้นในเวิร์กสเปซปัจจุบัน (`/workspace/app/.kilo/`) คุณสามารถคัดลอกหรือซิงก์ไปยังบัญชี Kilo และเซิร์ฟเวอร์ส่วนตัวของคุณได้ภายหลัง

ข้ามรูปภาพและคลิปวิดีโอทั้งหมดตามที่ร้องขอ เนื่องจากระบบไม่เสถียร