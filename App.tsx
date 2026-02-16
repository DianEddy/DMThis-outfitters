
import React from 'react';
import { DesignerWizard } from './components/DesignerWizard';

const App: React.FC = () => {
  const showcaseImages = [
    {
      url: "https://raw.githubusercontent.com/DianEddy/Public-files/main/IMG_4481.jpg",
      label: "Bespoke Evening Silhouette",
      category: "Evening Wear"
    },
    {
      url: "https://raw.githubusercontent.com/DianEddy/Public-files/main/IMG_4517%202.jpg",
      label: "Artisan Drape Analysis",
      category: "Couture Detail"
    },
    {
      url: "https://raw.githubusercontent.com/DianEddy/Public-files/main/show%203.jpg",
      label: "Heritage Silk Gown",
      category: "Bridal & Gala"
    },
    {
      url: "https://raw.githubusercontent.com/DianEddy/Public-files/main/show%204.jpg",
      label: "Structural Tailoring",
      category: "Modern Minimalist"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation */}
      <nav className="px-6 py-10 md:px-16 flex justify-between items-center border-b border-stone-100 bg-white/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white font-serif text-xl italic shadow-lg">D</div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif tracking-tighter leading-none text-stone-900">DMThis</span>
            <span className="text-[9px] tracking-[0.5em] font-black text-stone-400 uppercase leading-none mt-1">Outfitters</span>
          </div>
        </div>
        <div className="hidden lg:flex space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
          <a href="#" className="hover:text-stone-900 transition-colors">Atelier Heritage</a>
          <a href="#" className="hover:text-stone-900 transition-colors">The Bespoke Method</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Curated Fabric</a>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.goodheartapp.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-3 border border-stone-200 rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:border-stone-900 hover:text-stone-900 transition-all text-stone-400"
          >
            about the app
          </a>
          <button className="px-8 py-3 bg-stone-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-black hover:shadow-2xl transition-all">
            get the app
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="flex-grow">
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-24 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-amber-50/40 rounded-full blur-[120px] -z-10" />
            <h1 className="text-6xl md:text-9xl mb-10 font-serif leading-[0.85] tracking-tighter text-stone-900">Your vision,<br/> impeccably engineered.</h1>
            <p className="text-stone-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
              Design bespoke apparel through our intelligent atelier. We combine algorithmic precision with historic tailoring to produce instant artisan appraisals and conceptual sketches.
            </p>
          </div>

          <DesignerWizard />
        </section>

        {/* Showcase Section */}
        <section className="py-32 px-6 bg-stone-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center lg:text-left">
              <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">The Lookbook</p>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tight">Portfolio of Excellence</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {showcaseImages.map((img, idx) => (
                <div key={idx} className="group relative">
                  <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-stone-800 transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-3xl">
                    <img 
                      src={img.url} 
                      alt={img.label} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out" 
                    />
                  </div>
                  <div className="mt-6 space-y-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[9px] font-black uppercase tracking-widest text-amber-500">{img.category}</p>
                    <p className="text-xl font-serif italic text-white/90">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white py-40 px-6 border-t border-stone-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-24">
            <div className="group">
              <span className="text-amber-600 font-black text-[10px] tracking-[0.4em] mb-6 block uppercase">01 / The Method</span>
              <h4 className="text-4xl font-serif mb-6 text-stone-900">Artisan Integrity</h4>
              <p className="text-stone-400 leading-relaxed font-light text-lg">Every commission is scrutinized by our AI atelier to ensure structural stability before a single stitch is placed.</p>
            </div>
            <div className="group">
              <span className="text-amber-600 font-black text-[10px] tracking-[0.4em] mb-6 block uppercase">02 / The Thread</span>
              <div className="h-[1px] w-full bg-stone-100 mb-8 group-hover:bg-amber-600 transition-all duration-700" />
              <h4 className="text-4xl font-serif mb-6 text-stone-900">Bespoke Sourcing</h4>
              <p className="text-stone-400 leading-relaxed font-light text-lg">We maintain direct connections with heritage mills in Italy and France, offering textiles reserved for the world's most elite houses.</p>
            </div>
            <div className="group">
              <span className="text-amber-600 font-black text-[10px] tracking-[0.4em] mb-6 block uppercase">03 / The Finish</span>
              <h4 className="text-4xl font-serif mb-6 text-stone-900">Digital Drafting</h4>
              <p className="text-stone-400 leading-relaxed font-light text-lg">Proprietary logic translates your conceptual selections into millimeter-precise patterns optimized for your unique form.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-stone-50 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white font-serif text-xl italic">D</div>
              <span className="text-2xl font-serif tracking-tighter text-stone-900">DMThis Outfitters</span>
            </div>
            <p className="text-stone-400 text-sm max-w-sm leading-relaxed font-light">Intersection of artisanal craft and digital intelligence. Redefining bespoke for the modern era.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-24 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mt-16 md:mt-0">
            <div className="flex flex-col space-y-5">
              <span className="text-stone-900 tracking-[0.1em]">The Studio</span>
              <a href="#" className="hover:text-amber-600 transition-colors">Our Story</a>
              <a href="#" className="hover:text-amber-600 transition-colors">The Logic</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Sustainability</a>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="text-stone-900 tracking-[0.1em]">Bespoke</span>
              <a href="#" className="hover:text-amber-600 transition-colors">Fitting Guide</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Private Viewing</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Returns</a>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="text-stone-900 tracking-[0.1em]">Studio Social</span>
              <a href="#" className="hover:text-amber-600 transition-colors">Instagram</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Pinterest</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-stone-50 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.5em] text-stone-300">
          <p>&copy; 2024 DMThis Outfitters Bespoke Atelier. London & Paris.</p>
          <div className="flex space-x-10">
            <a href="#" className="hover:text-stone-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
