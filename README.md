```tsx
const status = useSignal<'idle' | 'fetching'>(statusSignal)
  <Switch>
    <Match when={status() === "idle"}>初始化</Match>
    <Match when={status() === "fetching"}>请求中</Match>
    <Match when={status() === "success"}>请求成功</Match>
  </Switch>

```
