/* eslint-disable @next/next/no-img-element */
import "../styles/globals.css";

const MOCK = {
  "IGEL-001": { verdict: "clean", diff: [] },
  "IGEL-002": {
    verdict: "suspect",
    diff: [
      { pcr: 7, expected: "0x8f3…cd2", got: "0xffe…911" },
      { pcr: 11, expected: "0xa2b…12e", got: "0xab0…44c" },
    ],
  },
  "IGEL-003": { verdict: "clean", diff: [] },
};

export default function Home() {
  const [device, setDevice] = useState<keyof typeof MOCK>("IGEL-001");
  const res = MOCK[device];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Certified Clean Endpoint&nbsp;
        <span className="text-indigo-600">Demo</span>
      </h1>

      {/* Device selector */}
      <select
        value={device}
        onChange={(e) => setDevice(e.target.value as any)}
        className="mb-6 px-4 py-2 rounded border shadow"
      >
        {Object.keys(MOCK).map((id) => (
          <option key={id}>{id}</option>
        ))}
      </select>

      {/* Verdict badge */}
      {res.verdict === "clean" ? (
        <div className="bg-green-500 text-white px-6 py-3 rounded-full text-xl shadow">
          ✔︎ Device is CLEAN
        </div>
      ) : (
        <div className="bg-red-600 text-white px-6 py-3 rounded-full text-xl shadow">
          ✖︎ Device is SUSPECT
        </div>
      )}

      {/* PCR diff panel */}
      {res.diff.length > 0 && (
        <details className="mt-4 bg-white shadow rounded p-4 w-80">
          <summary className="cursor-pointer font-medium">
            View PCR differences
          </summary>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">PCR</th>
                <th className="text-left">Expected</th>
                <th className="text-left">Actual</th>
              </tr>
            </thead>
            <tbody>
              {res.diff.map((d) => (
                <tr key={d.pcr}>
                  <td className="pr-2 font-mono">#{d.pcr}</td>
                  <td className="pr-2 font-mono">{d.expected}</td>
                  <td className="font-mono text-red-700">{d.got}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}

      <footer className="mt-8 text-xs text-gray-500 text-center">
        Prototype: static mock • Next.js • Tailwind • Deployed on Vercel<br />
        Roadmap → real TPM 2.0 attestation &amp; IGEL UMS integration
      </footer>
    </div>
  );
}
