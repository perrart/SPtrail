import './HowToPlayScreen.css';

interface HowToPlayScreenProps {
  onBack: () => void;
}

export function HowToPlayScreen({ onBack }: HowToPlayScreenProps) {
  return (
    <div className="howto">
      <div className="eyebrow">COMO JOGAR</div>
      <h2 className="howto__title">Sobreviva à semana</h2>

      <ol className="howto__steps">
        <li>
          <strong>Escolha um bairro.</strong> Cada região de São Paulo tem seu próprio ritmo, custo
          e tipo de encrenca.
        </li>
        <li>
          <strong>Escolha como chegar lá.</strong> Metrô, ônibus, Uber ou bicicleta — cada um muda
          suas chances.
        </li>
        <li>
          <strong>Enfrente o evento.</strong> A cidade sorteia algo compatível com o bairro e o
          transporte escolhidos.
        </li>
        <li>
          <strong>Reaja.</strong> Três escolhas, nenhuma perfeita. O resultado nunca é exatamente
          igual duas vezes.
        </li>
        <li>
          <strong>Repita.</strong> 3 turnos por dia, 7 dias, 21 decisões no total.
        </li>
      </ol>

      <div className="howto__resources">
        <div className="eyebrow">SEUS RECURSOS</div>
        <ul>
          <li>💰 <strong>Dinheiro</strong> — zera, o jogo acaba.</li>
          <li>⚡ <strong>Energia</strong> — zera, o jogo acaba.</li>
          <li>🧠 <strong>Saúde Mental</strong> — zera, o jogo acaba.</li>
          <li>🤝 <strong>Contatos</strong> — sua rede na cidade.</li>
          <li>⭐ <strong>Reputação</strong> — como a cidade te enxerga.</li>
        </ul>
      </div>

      <button className="btn btn-primary btn-block" onClick={onBack}>
        Voltar
      </button>
    </div>
  );
}
