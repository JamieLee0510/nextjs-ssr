

## 基本SSR
## hydrateRoot
這個函數允許你在線牽有react-dom/server 生成的瀏覽器HTML DOM節點中展示React組件。

簡單來說， createRoot會重新渲染，hydrateRoot會復用以有的DOM節點，它就是搭配React的服務端API react-dom/server使用的。

## 流式SSR
React 18之後，允許使用者對每個組件進行單獨處理，並在加載新數據時連續流失傳輸內容。這樣一來，可以通過用戶在頁面的其餘部分仍在加載時率先可以對已經流式傳輸到達的組件進行交互，以此來提高用戶體驗。

服務端的流式渲染，是為了解決渲染組件過大的問題。可以查看demo

