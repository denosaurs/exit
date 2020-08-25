const sync: (() => void)[] = [];

export function onExit(action: () => void): void {
  sync.push(action);
  if (sync.length === 1) {
    (async () => {
      window.onunload = async () => {
        for (const op of sync) {
          op();
        }
      };
      const ss = [
        Deno.signals.quit(),
        Deno.signals.interrupt(),
        Deno.signals.terminate(),
      ];
      for (const s of ss) {
        (async () => {
          for await (const _ of s) {
            for (const op of sync) {
              op();
            }
            Deno.exit(-128);
          }
        })();
      }
    })();
  }
}
