
import React, { useState, useEffect } from 'react';
import { CATEGORIES, SILHOUETTES_BY_CATEGORY, NECKLINES, SLEEVES, LENGTHS } from '../constants';
import { DesignConfig, QuoteResult, Category, Silhouette } from '../types';
import { getQuoteAndAnalysis, generatePreviewImage } from '../services/geminiService';
import { FashionIcon } from './IconGallery';

// Added key prop to OptionCardProps to resolve TypeScript errors when passing key to custom components in maps
interface OptionCardProps<T extends string> {
  key?: React.Key;
  label: string;
  value: T;
  currentValue: T;
  onSelect: (v: T) => void;
  description?: string;
}

// OptionCard component defined with the updated interface to handle React's key attribute
function OptionCard<T extends string>({ 
  label, 
  value, 
  currentValue, 
  onSelect,
  description
}: OptionCardProps<T>) {
  const isActive = currentValue === value;
  return (
    <button
      onClick={() => onSelect(value)}
      className={`flex flex-col items-center justify-center p-5 border rounded-2xl transition-all duration-300 group ${
        isActive 
          ? 'border-amber-600 bg-amber-50/50 shadow-md ring-1 ring-amber-600' 
          : 'border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm'
      }`}
    >
      <div className={`mb-3 transition-all duration-500 ${isActive ? 'text-amber-600 scale-110' : 'text-stone-300 group-hover:text-stone-500'}`}>
        <FashionIcon type={value} className="w-12 h-12" />
      </div>
      <span className={`block font-bold text-[10px] tracking-[0.2em] uppercase text-center transition-colors ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
        {label}
      </span>
      {description && <span className="block text-[9px] text-stone-400 mt-2 text-center leading-tight tracking-tighter italic">{description}</span>}
    </button>
  );
}

const LoadingOverlay = ({ stage }: { stage: number }) => {
  const messages = [
    "Consulting master tailors...",
    "Drafting digital patterns...",
    "Analyzing textile drape...",
    "Calculating manual bench hours...",
    "Finalizing artisan appraisal..."
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-pulse">
      <div className="relative">
        <div className="w-24 h-24 border-t-2 border-amber-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center font-serif italic text-amber-900">DM</div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 mb-2">Atelier in Session</p>
        <p className="text-xl font-serif text-stone-800 transition-all duration-500">{messages[stage]}</p>
      </div>
    </div>
  );
};

export const DesignerWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [config, setConfig] = useState<DesignConfig>({
    category: 'Dress',
    silhouette: 'A-Line',
    neckline: 'V-Neck',
    sleeveStyle: 'Sleeveless',
    length: 'Floor-Length',
    additionalNotes: '',
    fabricSourceType: 'description',
    fabricData: ''
  });

  useEffect(() => {
    let interval: any;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingStage((prev) => (prev + 1) % 5);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleCategoryChange = (cat: Category) => {
    setConfig({
      ...config,
      category: cat,
      silhouette: SILHOUETTES_BY_CATEGORY[cat][0],
      neckline: (cat === 'Skirt' || cat === 'Pants') ? 'None' : 'V-Neck',
      sleeveStyle: (cat === 'Skirt' || cat === 'Pants') ? 'None' : 'Sleeveless'
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const [quoteRes, previewRes] = await Promise.all([
        getQuoteAndAnalysis(config),
        generatePreviewImage(config)
      ]);
      setQuote(quoteRes);
      setPreview(previewRes);
      setStep(6);
    } catch (err) {
      console.error(err);
      alert("Atelier connection interrupted. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUpperGarment = config.category === 'Dress' || config.category === 'Top' || config.category === 'Jumpsuit';

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
      {/* Step Indicator Sidebar (Desktop) */}
      {step <= 5 && (
        <div className="hidden lg:flex flex-col w-48 space-y-6">
          {[1,2,3,4,5].map((s) => (
            <div key={s} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${step >= s ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-200 text-stone-300'}`}>
                0{s}
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-black ${step === s ? 'text-stone-900' : 'text-stone-300'}`}>
                {s === 1 ? 'Basis' : s === 2 ? 'Shape' : s === 3 ? 'Artisan' : s === 4 ? 'Textile' : 'Finalize'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main Design Area */}
      <div className="flex-grow bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 min-h-[700px] border border-stone-100 flex flex-col relative overflow-hidden">
        {isSubmitting ? (
          <div className="flex-grow flex items-center justify-center">
            <LoadingOverlay stage={loadingStage} />
          </div>
        ) : (
          <>
            {step <= 5 && (
              <div className="flex justify-between items-end mb-10 border-b border-stone-50 pb-8">
                <div>
                  <p className="text-amber-600 font-black text-[9px] uppercase tracking-[0.5em] mb-2">Master Specification</p>
                  <h2 className="text-4xl font-serif text-stone-900">
                    {step === 1 && 'Define the Base'}
                    {step === 2 && 'Sculpt the Silhouette'}
                    {step === 3 && 'Artisan Detailing'}
                    {step === 4 && 'Curate Materials'}
                    {step === 5 && 'Tailoring Notes'}
                  </h2>
                </div>
              </div>
            )}

            <div className="flex-grow">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {CATEGORIES.map(c => (
                      <OptionCard key={c} label={c} value={c} currentValue={config.category} onSelect={handleCategoryChange} />
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {SILHOUETTES_BY_CATEGORY[config.category].map(s => (
                      <OptionCard key={s} label={s} value={s} currentValue={config.silhouette} onSelect={(v) => setConfig({...config, silhouette: v as Silhouette})} />
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="grid md:grid-cols-2 gap-12">
                    {isUpperGarment && (
                      <div className="space-y-10">
                        <div>
                          <label className="block text-[9px] font-black mb-4 text-stone-400 uppercase tracking-widest">Neckline Selection</label>
                          <div className="grid grid-cols-3 gap-3">
                            {NECKLINES.filter(n => n !== 'None').map(n => (
                              <OptionCard key={n} label={n} value={n} currentValue={config.neckline} onSelect={(v) => setConfig({...config, neckline: v})} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] font-black mb-4 text-stone-400 uppercase tracking-widest">Sleeve Engineering</label>
                          <div className="grid grid-cols-3 gap-3">
                            {SLEEVES.filter(s => s !== 'None').map(s => (
                              <OptionCard key={s} label={s} value={s} currentValue={config.sleeveStyle} onSelect={(v) => setConfig({...config, sleeveStyle: v})} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-[9px] font-black mb-4 text-stone-400 uppercase tracking-widest">Hemline & Length</label>
                      <div className="grid grid-cols-2 gap-3">
                        {LENGTHS.map(l => (
                          <OptionCard key={l} label={l} value={l} currentValue={config.length} onSelect={(v) => setConfig({...config, length: v})} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-2xl mx-auto text-center">
                  <div className="inline-flex p-1 bg-stone-100 rounded-full mb-10">
                    {(['description', 'link', 'upload'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setConfig({...config, fabricSourceType: t, fabricData: ''})}
                        className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                          config.fabricSourceType === t ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[300px] border border-stone-100 bg-stone-50/50 rounded-[2rem] p-8 flex items-center justify-center">
                    {config.fabricSourceType === 'description' && (
                      <textarea 
                        className="w-full bg-transparent text-center text-2xl outline-none placeholder:text-stone-300 resize-none h-32 font-serif italic"
                        placeholder="Detail the textile weight and origin..."
                        value={config.fabricData}
                        onChange={(e) => setConfig({...config, fabricData: e.target.value})}
                      />
                    )}
                    {config.fabricSourceType === 'link' && (
                      <input 
                        type="url" 
                        className="w-full p-6 bg-white border border-stone-100 rounded-2xl outline-none text-center font-light text-stone-600"
                        placeholder="Sourcing Link (Mood, Spoonflower, etc.)"
                        value={config.fabricData}
                        onChange={(e) => setConfig({...config, fabricData: e.target.value})}
                      />
                    )}
                    {config.fabricSourceType === 'upload' && (
                      <div className="text-center group">
                        <input type="file" id="fab-up" accept="image/*" className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setConfig({...config, fabricData: reader.result as string});
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label htmlFor="fab-up" className="cursor-pointer block">
                          {config.fabricData ? (
                            <img src={config.fabricData} className="w-56 h-56 object-cover rounded-[1.5rem] mx-auto shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-105" alt="Swatch" />
                          ) : (
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                              <svg className="w-8 h-8 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeWidth={1}/></svg>
                            </div>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <textarea 
                    className="w-full p-10 bg-stone-50 border border-stone-100 rounded-[2.5rem] min-h-[400px] outline-none text-xl font-light leading-relaxed placeholder:text-stone-300"
                    placeholder="Describe specific structural requests or finishings..."
                    value={config.additionalNotes}
                    onChange={(e) => setConfig({...config, additionalNotes: e.target.value})}
                  />
                </div>
              )}

              {step === 6 && quote && (
                <div className="animate-in fade-in zoom-in-95 duration-1000">
                  <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                      <div>
                        <p className="text-amber-600 font-black text-[9px] uppercase tracking-[0.5em] mb-4">Official Artisan Appraisal</p>
                        <h3 className="text-6xl font-serif text-stone-900 tracking-tighter mb-4">{quote.estimatedPrice}</h3>
                        <div className="flex space-x-6">
                          <div className="text-stone-400">
                            <span className="text-[9px] block font-black uppercase tracking-widest mb-1">Bench Hours</span>
                            <span className="text-xl font-serif italic text-stone-800">{quote.laborHours}</span>
                          </div>
                          <div className="text-stone-400">
                            <span className="text-[9px] block font-black uppercase tracking-widest mb-1">Artisan Grade</span>
                            <span className="text-xl font-serif italic text-stone-800">{quote.complexity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                         <h4 className="text-[9px] font-black uppercase text-stone-400 tracking-[0.3em]">Technical Scope</h4>
                         {quote.breakdown.map((item, idx) => (
                           <div key={idx} className="flex items-center space-x-4 bg-stone-50/50 p-4 rounded-xl border border-stone-100">
                             <div className="w-1 h-1 rounded-full bg-amber-600" />
                             <span className="text-xs font-medium text-stone-700">{item}</span>
                           </div>
                         ))}
                      </div>

                      {quote.sources && quote.sources.length > 0 && (
                        <div className="pt-6 border-t border-stone-100">
                          <h4 className="text-[9px] font-black uppercase text-stone-400 tracking-[0.3em] mb-4">Sourcing Reference</h4>
                          <div className="flex flex-wrap gap-2">
                            {quote.sources.map((source, idx) => (
                              <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] bg-white hover:bg-stone-900 hover:text-white px-4 py-2 rounded-full border border-stone-100 transition-all font-bold">
                                {source.title.slice(0, 30)}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-8 bg-amber-50/30 rounded-[2.5rem] border border-amber-100/30">
                         <p className="text-base text-amber-900 leading-relaxed italic font-serif">"{quote.fabricAnalysis}"</p>
                      </div>
                    </div>

                    <div className="space-y-10">
                      <div className="aspect-[3/4] bg-stone-100 rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white">
                        {preview ? (
                          <img src={preview} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="Technical Drawing" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[9px] font-black text-stone-300 uppercase tracking-widest">Generating Concept...</div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-8">
                          <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/20">
                            <p className="text-[9px] font-black uppercase text-stone-900 mb-2">Technical Blueprint</p>
                            <p className="text-xs italic font-serif text-stone-800">Bespoke {config.silhouette} {config.category}</p>
                          </div>
                        </div>
                      </div>
                      <a 
                        href="https://calendar.app.google/19EXpcfCkVCTczVT7" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-6 bg-stone-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl block text-center"
                      >
                        Book Virtual Consultation
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {step < 6 && (
              <div className="mt-12 flex justify-between items-center pt-8 border-t border-stone-50">
                {step > 1 ? (
                  <button onClick={handlePrev} className="px-8 py-4 rounded-full border border-stone-100 text-[9px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all">
                    Previous Step
                  </button>
                ) : <div />}
                
                {step < 5 ? (
                  <button onClick={handleNext} className="px-12 py-4 bg-stone-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg">
                    Continue Design
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="px-16 py-4 bg-amber-600 text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-amber-700 transition-all shadow-xl disabled:bg-stone-100 disabled:text-stone-300"
                  >
                    Generate Appraisal
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Live Spec-Sheet (Desktop Only) */}
      {step <= 5 && (
        <div className="hidden xl:block w-72 space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="p-8 bg-stone-900 text-white rounded-[2.5rem] shadow-2xl space-y-6">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500">Active Specs</p>
            <div className="space-y-4 font-serif italic text-sm border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <span className="text-white/40 not-italic uppercase text-[8px] tracking-widest">Base</span>
                <span>{config.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 not-italic uppercase text-[8px] tracking-widest">Silhouette</span>
                <span>{config.silhouette}</span>
              </div>
              {isUpperGarment && (
                <>
                  <div className="flex justify-between">
                    <span className="text-white/40 not-italic uppercase text-[8px] tracking-widest">Neck</span>
                    <span>{config.neckline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40 not-italic uppercase text-[8px] tracking-widest">Sleeve</span>
                    <span>{config.sleeveStyle}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-white/40 not-italic uppercase text-[8px] tracking-widest">Length</span>
                <span>{config.length}</span>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <p className="text-[8px] uppercase tracking-widest text-white/40 mb-2">Artisan Status</p>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${(step/5)*100}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
