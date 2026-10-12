import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, Check, Copy, FileArrowUp, FileText, LinkSimple, MagnifyingGlass, ShieldCheck, Warning, X } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { n: '01', label: 'Ingest', title: 'Bring the deal into focus.', body: 'Mixed lending documents enter one controlled workspace, ready for structured review.', mode: 'documents' },
  { n: '02', label: 'Extract', title: 'Turn source material into facts.', body: 'Illustrative deal facts are surfaced with their original context still attached.', mode: 'facts' },
  { n: '03', label: 'Trace', title: 'Every fact keeps its evidence.', body: 'Precise references connect structured information back to the supporting source.', mode: 'evidence' },
  { n: '04', label: 'Review', title: 'Find what needs attention.', body: 'Gaps and inconsistencies are organised for professional review, not hidden behind a score.', mode: 'findings' },
  { n: '05', label: 'Compose', title: 'Build the credit paper.', body: 'Evidence and analysis converge into a clear, committee-ready structure.', mode: 'paper' },
  { n: '06', label: 'Decide', title: 'Keep judgment human.', body: 'The reviewer validates the evidence and retains responsibility for final sign-off.', mode: 'human' },
]

function DemoDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return <AnimatePresence>{open && (
    <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby="demo-title" className="dialog" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} transition={{ type: 'spring', stiffness: 280, damping: 28 }} onMouseDown={(e) => e.stopPropagation()}>
        <button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button>
        <span className="eyebrow">Demo request</span>
        <h2 id="demo-title">Start a conversation with Creditteam.</h2>
        <p>This concept does not include a verified contact endpoint. The production CTA can be connected to your existing CRM, calendar, or contact route without presenting a false submission.</p>
        <button className="button button-primary" onClick={() => navigator.clipboard?.writeText('I would like to request a Creditteam demo.')}><Copy size={17} /> Copy request message</button>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}

function ProductScene({ compact = false }) {
  return (
    <div className={`product-scene ${compact ? 'compact' : ''}`} aria-label="Illustrative Creditteam evidence workspace">
      <div className="source-document panel">
        <div className="doc-bar"><span>VALUATION SUMMARY</span><span className="simulated">ILLUSTRATIVE</span></div>
        <div className="doc-title">Commercial Property<br />Valuation</div>
        <div className="doc-meta"><span>Asset</span><b>Example property</b></div>
        <div className="doc-meta focus"><span>Market value</span><b>$24,000,000</b><i /></div>
        <div className="doc-meta"><span>Valuation date</span><b>18 Sep 2026</b></div>
        <div className="doc-lines"><i /><i /><i /><i /></div>
      </div>
      <div className="evidence-line line-one" />
      <div className="evidence-line line-two" />
      <div className="fact-card panel">
        <span className="card-label">Structured fact</span>
        <span className="fact-name">Market value</span>
        <strong>$24.0m</strong>
        <small><LinkSimple size={13} /> Source linked</small>
      </div>
      <div className="finding-card panel">
        <span className="card-label">Review finding</span>
        <div><Warning size={18} /><b>Date requires review</b></div>
        <p>One source uses a different valuation date.</p>
      </div>
      <div className="paper-card panel">
        <div className="paper-head"><FileText size={18} /><span>CREDIT PAPER</span><small>Draft</small></div>
        <h3>Facility overview</h3>
        <div className="paper-grid"><span>Facility amount<b>$14.4m</b></span><span>Illustrative LVR<b>60.0%</b></span></div>
        <div className="paper-rule" /><p>Evidence references and review findings remain visible through preparation.</p>
        <div className="review-chip"><Check size={13} /> Ready for human review</div>
      </div>
    </div>
  )
}

function WorkflowVisual() {
  return (
    <div className="workflow-visual" aria-hidden="true">
      <div className="stage-top"><span>ILLUSTRATIVE WORKSPACE</span><span className="stage-status"><i /> Evidence connected</span></div>
      <div className="stage-canvas">
        <div className="wf-doc wf-panel">
          <span>SOURCE 03</span><h4>Valuation report</h4><p>Market value</p><b>$24,000,000</b><i className="highlight" />
        </div>
        <div className="wf-facts wf-panel">
          <span>STRUCTURED FACTS</span><div><small>Facility</small><b>$14.4m</b></div><div><small>Value</small><b>$24.0m</b></div><div><small>LVR</small><b>60.0%</b></div>
        </div>
        <svg className="connectors" viewBox="0 0 600 400" preserveAspectRatio="none"><path d="M180 185 C260 185 245 88 356 88" /><path d="M180 185 C270 185 250 190 356 190" /></svg>
        <div className="wf-finding wf-panel"><Warning size={20} /><div><span>REVIEW FINDING</span><b>Confirm valuation date</b></div></div>
        <div className="wf-paper wf-panel"><span>CREDIT PAPER / DRAFT</span><h4>Credit assessment</h4><div className="mini-row"><b>Facility</b><i />$14.4m</div><div className="mini-row"><b>Security</b><i />Property</div><p>Prepared from linked evidence for review and sign-off.</p></div>
        <div className="wf-review wf-panel"><div className="avatar">AR</div><div><span>HUMAN REVIEW</span><b>Evidence reviewed</b></div><Check size={20} /></div>
      </div>
      <div className="stage-footer"><span className="stage-count">01 / 06</span><span>Source traceability maintained</span></div>
    </div>
  )
}

function Workflow() {
  const root = useRef(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || window.innerWidth < 900) return
    const ctx = gsap.context(() => {
      const visual = root.current.querySelector('.workflow-visual')
      const count = visual.querySelector('.stage-count')
      const layers = ['.wf-doc', '.wf-facts', '.connectors', '.wf-finding', '.wf-paper', '.wf-review']
      gsap.set(layers.slice(1), { opacity: 0, y: 28, scale: .96 })
      gsap.to(visual, { scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', pin: visual, pinSpacing: false } })
      root.current.querySelectorAll('.workflow-copy').forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item, start: 'top 52%', end: 'bottom 52%',
          onEnter: () => activate(index), onEnterBack: () => activate(index),
        })
      })
      function activate(index) {
        count.textContent = `${String(index + 1).padStart(2, '0')} / 06`
        gsap.to(layers, { opacity: 0, y: 18, scale: .97, duration: .35, overwrite: true })
        if (index === 0) gsap.to('.wf-doc', { opacity: 1, y: 0, scale: 1, duration: .6 })
        if (index === 1) { gsap.to('.wf-doc', { opacity: .5, x: -40, y: 0, scale: .9 }); gsap.to('.wf-facts', { opacity: 1, y: 0, scale: 1, duration: .6 }) }
        if (index === 2) { gsap.to(['.wf-doc', '.wf-facts', '.connectors'], { opacity: 1, y: 0, scale: 1, duration: .55 }) }
        if (index === 3) { gsap.to(['.wf-facts', '.wf-finding'], { opacity: 1, y: 0, scale: 1, duration: .55 }) }
        if (index === 4) gsap.to('.wf-paper', { opacity: 1, y: 0, scale: 1, duration: .65 })
        if (index === 5) { gsap.to('.wf-paper', { opacity: .58, y: -24, scale: .94 }); gsap.to('.wf-review', { opacity: 1, y: 0, scale: 1, duration: .65 }) }
      }
      activate(0)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="workflow" id="workflow" ref={root}>
      <div className="workflow-intro"><span className="eyebrow">The underwriting workflow</span><h2>One continuous chain<br />from source to sign-off.</h2></div>
      <div className="workflow-grid">
        <WorkflowVisual />
        <div className="workflow-copy-list">
          {steps.map((step) => <article className="workflow-copy" key={step.n}><span>{step.n} / {step.label}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const openDialog = () => setDialogOpen(true)
  return (
    <>
      <header className="nav-shell">
        <a href="#top" aria-label="Creditteam home"><img src="/creditteam-logo.svg" alt="Creditteam" /></a>
        <nav aria-label="Primary navigation"><a href="#workflow">Workflow</a><a href="#capabilities">Capabilities</a><a href="#governance">Governance</a></nav>
        <button className="nav-cta" onClick={openDialog}>Request a demo <ArrowRight size={15} /></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-copy">
            <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>AI-powered credit underwriting</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .7 }}>From deal documents<br />to <em>credit clarity.</em></motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .7 }}>Turn complex property lending documents into evidence-backed credit papers, with the traceability and human oversight serious decisions demand.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .32 }}><button className="button button-primary" onClick={openDialog}>Request a demo <ArrowRight size={17} /></button><a className="text-link" href="#workflow">Explore the workflow <ArrowDown size={16} /></a></motion.div>
          </div>
          <motion.div className="hero-product" initial={{ opacity: 0, y: 42, rotateX: 6 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .2, duration: .9, ease: [.2, .8, .2, 1] }}><ProductScene /></motion.div>
          <div className="hero-foot"><span>INTELLIGENCE</span><i /><span>EVIDENCE</span><i /><span>CONFIDENCE</span></div>
        </section>

        <section className="problem" id="problem">
          <div className="problem-image"><img src="/underwriting-desk.png" loading="lazy" alt="Illustrative lending documents arranged across an analyst desk" /><span>Illustrative lending document set</span></div>
          <div className="problem-copy"><span className="eyebrow">The problem</span><h2>Credit insight is buried across the deal file.</h2><p>Property lending analysis demands context, consistency, and a defensible link to source material. Creditteam brings the working evidence into one reviewable flow.</p><div className="quiet-list"><span><MagnifyingGlass />Less time retracing facts</span><span><LinkSimple />Evidence stays connected</span><span><ShieldCheck />Review remains controlled</span></div></div>
        </section>

        <Workflow />

        <section className="capabilities" id="capabilities">
          <div className="section-heading"><span className="eyebrow">Built around the work</span><h2>A clearer way through complex credit preparation.</h2><p>Each capability supports the same outcome: a more structured, traceable, and reviewable credit paper.</p></div>
          <div className="capability-ledger">
            <article><span>01</span><FileArrowUp /><h3>Document ingestion</h3><p>Bring deal materials into a structured preparation workflow.</p></article>
            <article><span>02</span><MagnifyingGlass /><h3>Fact extraction</h3><p>Surface key financial and property facts for professional review.</p></article>
            <article><span>03</span><LinkSimple /><h3>Source traceability</h3><p>Keep evidence references attached to the facts they support.</p></article>
            <article><span>04</span><Warning /><h3>Review findings</h3><p>Make missing information and inconsistencies visible.</p></article>
          </div>
        </section>

        <section className="output" id="output">
          <div className="output-copy"><span className="eyebrow">The output</span><h2>Committee-ready structure.<br /><em>Evidence still in view.</em></h2><p>The credit paper is the conclusion of the workflow, not a black box. Structured sections, supporting references, and open review items remain legible to the people accountable for the decision.</p><div className="output-note"><ShieldCheck size={20} /><span><b>Human accountability</b>Creditteam supports preparation and review. The qualified reviewer retains final sign-off.</span></div></div>
          <div className="paper-preview"><div className="paper-preview-head"><img src="/creditteam-logo.svg" alt="" /><span>ILLUSTRATIVE CREDIT PAPER</span></div><h3>Credit assessment</h3><p>Commercial real estate facility</p><div className="preview-kpis"><span><small>Facility amount</small><b>$14,400,000</b></span><span><small>Illustrative LVR</small><b>60.0%</b></span></div><h4>Executive overview</h4><div className="text-bars"><i /><i /><i /></div><h4>Evidence register</h4><div className="evidence-row"><span>Market value</span><b>$24,000,000</b><small>Source 03 · p.18</small></div><div className="evidence-row"><span>Valuation date</span><b>18 Sep 2026</b><small className="review">Review</small></div></div>
        </section>

        <section className="governance" id="governance"><div><span className="eyebrow">Governance by design</span><h2>Confidence comes from what can be checked.</h2></div><p>Creditteam is designed around traceability, review visibility, and controlled human sign-off. Specific security and data-handling claims should be published only when supported by your production documentation.</p></section>

        <section className="final-cta" id="demo"><span className="eyebrow">See the evidence, not just the output</span><h2>Bring clarity to the<br /><em>next credit paper.</em></h2><button className="button button-light" onClick={openDialog}>Request a demo <ArrowRight size={18} /></button></section>
      </main>
      <footer><a href="#top"><img src="/creditteam-logo.svg" alt="Creditteam" /></a><p>AI-powered credit underwriting for Australian commercial real estate and private credit.</p><span>Human judgment remains final.</span></footer>
      <DemoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}

export default App
