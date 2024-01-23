```js
axios.post("", newEvent)
  .then((res) => {
    event(prevEvent => [...prevEvent, newEvent])
  })
  .catch((err) => {
    console.log(err)
  })
state(!state)
```

코드에서 볼 수 있듯이, axios.post의 결과를 기다리지 않고 바로 state(!state)를 실행하고 있습니다.
이는 비동기 작업인 axios.post가 완료되기 전에 상태를 변경하므로, 이로 인해 컴포넌트가 재렌더링되어 페이지가 깜빡거리는 것입니다.

이를 해결하기 위해 axios.post의 결과를 기다린 후에 상태를 변경하도록 코드를 수정해야 합니다. 아래와 같이 async/await를 사용하여 비동기 작업을 처리할 수 있습니다:

```js
const createInfo = async (e) => {
  e.preventDefault()
      
  const newEvent = {
    title: title,
    start: startDate,
    end: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)).toISOString().split('T')[0],
    color: `#${colorList.find((v) => v.label === nowColor).value}`,
  }

  try {
    const res = await axios.post("", newEvent)
    event(prevEvent => [...prevEvent, newEvent])
    state(!state)
  } catch (err) {
    console.log(err)
  }
}
```