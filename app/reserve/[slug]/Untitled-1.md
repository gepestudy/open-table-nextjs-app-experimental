[Bulk disburse] yang bug bulk disburse tolong di solve asap ya, td beberapa yang gue tangkep:
DONE

- inquiry fee potong saldo (reguler) ✅
- inquiry bulk norek ✅
- page inquiry disbursement dan sudah ada list inquirynya ✅
- kalau ada yg gagal (misal salah rekening), status stuck in progress bukan failed ✅
- sebelum di execute status harusnya "waiting" ✅
- export detail disbursement (bisa di export tp field nya tidak detail, tidak ada fee,no hp,bank name dll) ✅
- export bulk & api list tidak bisa di download ✅
- validasi bank name is required dari csv ✅
- ga bisa search input bank name saat setelah validate ✅

TASK:

- trx suspect di oy, status di kita failed ( ga bisa di test ) ❌
- merchant rate custom. fee inquiry di null/empty, di page inquiry-disbursement ke catet 0 (harusnya 500), di cash balance ke potong 500 (bener) ❌

negative case: - create & execute disburse pas2an tidak pake inquiry (tidak ada validasi insuficient balance) ❌ - double click execute - create & execute disburse pas2an tapi dengan validate/inquiry ✅
