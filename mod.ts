type Action = () => void | Promise<void>;

const actions: Action[] = [];
const ss: Deno.SignalStream[] = [];

async function setupHook() {
  if (Deno.build.os !== "windows") {
    ss.push(
      ...[
        Deno.signals.quit(),
        Deno.signals.interrupt(),
        Deno.signals.terminate(),
      ],
    );
    for (const s of ss) {
      (async () => {
        for await (const _ of s) {
          for (const op of actions) {
            await op();
          }
          Deno.exit(-128);
        }
      })();
    }
  }
}

export function onExit(action: Action): void {
  actions.push(action);
  if (actions.length === 1) {
    setupHook();
  }
}

export function exit(code?: number): never {
  for (const s of ss) s.dispose();
  return Deno.exit(code);
}
