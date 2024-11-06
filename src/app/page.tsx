import { ObservableEmbed } from "@/components/observableEmbed/server";

export default async function Home() {
  return (
    <div>
      <ObservableEmbed
        module="https://observablehq.observablehq.cloud/olympian-embeds/medals-chart.js"
        importName="MedalsChart"
      />
    </div>
  );
}
