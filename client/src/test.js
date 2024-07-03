fetchBtn.onclick = async () => {
    // создаем экземпляр контроллера
    const controller = new AbortController()
  
    abortBtn.addEventListener(
      'click',
      () => {
        // прерываем запрос
        controller.abort()
      },
      { once: true }
    )
  
    try {
      logBox.textContent = 'Start fetching'
  
      const response = await fetch(
        // указываем задержку
        `https://jsonplaceholder.typicode.com/users/1?_delay=${delayInput.value}`,
        // передаем сигнал
        { signal: controller.signal }
      )
  
      logBox.textContent = 'End fetching'
  
      const data = await response.json()
  
      dataBox.textContent = JSON.stringify(data, null, 2)
    } catch (e) {
      // если запрос был прерван
      if (e.name === 'AbortError') {
        logBox.textContent = 'Request aborted'
      } else {
        console.error(e)
      }
    }
  }