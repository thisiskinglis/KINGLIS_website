self.addEventListener('install', e=> self.skipWaiting())
self.addEventListener('activate', e=> e.waitUntil(clients.claim()))

let clientCode = null
let lastSeen = []

self.addEventListener('message', e=>{
  if(e.data && e.data.clientCode){
    clientCode = e.data.clientCode
    try{ lastSeen = JSON.parse(e.data.seen || '[]') }catch{}
  }
})

async function checkManifest(){
  if(!clientCode) return
  try{
    const res = await fetch(`./manifest_${clientCode}.json?t=${Date.now()}`, {cache:'no-store'})
    if(!res.ok) return
    const rows = await res.json()
    for(const row of rows){
      if(!lastSeen.includes(row.url)){
        lastSeen.push(row.url)
        const name = row.name.replace(/^\d+_/,'')
        await self.registration.showNotification('KINGLIS has sent you files', {
          body: name + ' - Click to download',
          icon: 'https://thisiskinglis.com/favicon.ico',
          data: { url: row.url }
        })
      }
    }
  }catch(e){}
}

setInterval(checkManifest, 30000) // check every 30s even when tab closed (if PWA installed + background apps ON)

self.addEventListener('notificationclick', e=>{
  e.notification.close()
  const url = e.notification.data.url
  e.waitUntil(clients.openWindow(url))
})
