"use client";
import { useEffect, useRef } from "react";

interface ObservableEmbedProps {
  module: string;
  importName: string;
}

export const ObservableEmbedClient: React.FC<ObservableEmbedProps> = ({
  module,
  importName,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const target = ref.current;
      if (!target) return;
      while (target.firstChild) target.removeChild(target.firstChild);
      const mod = await import(/* webpackIgnore: true */ module);
      const component = mod[importName];
      const element = component instanceof Function ? await component() : component;
      target.append(element);
    })();
  }, [importName, module]);

  return <div ref={ref} />;
};
