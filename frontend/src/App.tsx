import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaInstagram, FaFacebookF, FaShippingFast, FaAward } from 'react-icons/fa'
import { MdOutlineWorkspacePremium, MdDiamond } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Mousewheel, Pagination } from 'swiper/modules'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'swiper/css'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger)

type Product = {
  name: string
  price: number
  originalPrice: number
  img: string
  brand: string
  category: 'Rose Gold' | 'Diamond' | 'Fashion' | 'Smart'
  strapMaterial: 'Bimetal' | '18 Karat Gold' | 'Plastic' | 'Silicone' | 'Leather' | 'Acetate' | 'Acetate & Metal' | 'Ceramic'
}

const products: Product[] = [
  { name: 'Rose Halo', price: 499, originalPrice: 649, brand: 'Fossil', category: 'Rose Gold', strapMaterial: 'Bimetal', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80' },
  { name: 'Diamond Veil', price: 699, originalPrice: 899, brand: 'Swarovski', category: 'Diamond', strapMaterial: 'Ceramic', img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80' },
  { name: 'Kriscel Mini', price: 459, originalPrice: 590, brand: 'Kriscel', category: 'Fashion', strapMaterial: 'Plastic', img: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=900&q=80' },
  { name: 'Satin Gold', price: 539, originalPrice: 710, brand: 'Casio', category: 'Rose Gold', strapMaterial: '18 Karat Gold', img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80' },
  { name: 'Aero Steel', price: 575, originalPrice: 740, brand: 'Seiko', category: 'Rose Gold', strapMaterial: 'Acetate & Metal', img: 'https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?auto=format&fit=crop&w=900&q=80' },
  { name: 'Midnight Dial', price: 610, originalPrice: 790, brand: 'Tissot', category: 'Rose Gold', strapMaterial: 'Leather', img: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=900&q=80' },
  { name: 'Crystal Bloom', price: 620, originalPrice: 790, brand: 'Anne Klein', category: 'Diamond', strapMaterial: 'Acetate', img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80' },
  { name: 'Luna Mesh', price: 410, originalPrice: 520, brand: 'Titan', category: 'Fashion', strapMaterial: 'Bimetal', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80' },
  { name: 'Orbit Smart', price: 880, originalPrice: 1090, brand: 'Fitbit', category: 'Smart', strapMaterial: 'Silicone', img: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=80' },
  { name: 'Pulse One', price: 760, originalPrice: 940, brand: 'Amazfit', category: 'Smart', strapMaterial: 'Silicone', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80' },
  { name: 'Nova Sync', price: 820, originalPrice: 1010, brand: 'Garmin', category: 'Smart', strapMaterial: 'Ceramic', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80' },
  { name: 'Zen Track', price: 790, originalPrice: 980, brand: 'Samsung', category: 'Smart', strapMaterial: 'Silicone', img: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=900&q=80' },
]

type Brand = {
  name: string
  logo: string
}

const brands: Brand[] = [
  { name: 'OMEGA', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Omega_Logo.svg' },
  { name: 'DIOR', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Christian_Dior_SE_logo.svg' },
  { name: 'CHANEL', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Chanel_logo.svg' },
  { name: 'ROLEX', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Rolex_logo.svg' },
  { name: 'CARTIER', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Cartier_logo_no_background.svg' },
  { name: 'TISSOT', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Tissot_logo.svg' },
  { name: 'GUCCI', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Gucci_Logo.svg' },
]
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collection', href: '#collection' },
  { label: 'Luxury Series', href: '#luxury-series' },
  { label: 'Best Sellers', href: '#best-sellers' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const topTabs = ['Visit LUXE', 'All Watches', 'Men', 'Women', 'Smart', 'Brands', 'Stores', 'Offers', 'Gallery']
const strapMaterialFilters: Array<Product['strapMaterial']> = ['Bimetal', '18 Karat Gold', 'Plastic', 'Silicone', 'Leather', 'Acetate', 'Acetate & Metal', 'Ceramic']
const formatPrice = (value: number) => `$${value.toLocaleString()}`
const getDiscount = (price: number, originalPrice: number) => Math.round(((originalPrice - price) / originalPrice) * 100)
const fallbackImage = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80'
const heroBackgroundImages = [
  '/hero-luxury-watch.png',
  '/hero-luxury-watch-2.png',
]
const detailByCategory: Record<Product['category'], { movement: string; strap: string; waterRes: string; battery: string }> = {
  'Rose Gold': { movement: 'Japanese Quartz', strap: 'Polished Steel Mesh', waterRes: '5 ATM', battery: '3 years' },
  Diamond: { movement: 'Swiss Quartz', strap: 'Crystal Bracelet', waterRes: '3 ATM', battery: '2 years' },
  Fashion: { movement: 'Quartz Analog', strap: 'Soft Milanese Loop', waterRes: '3 ATM', battery: '2 years' },
  Smart: { movement: 'Smart Digital Core', strap: 'Silicone Hybrid', waterRes: '5 ATM', battery: '7 days' },
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('home')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedStrapMaterial, setSelectedStrapMaterial] = useState<'All' | Product['strapMaterial']>('All')
  const [activeTopTab, setActiveTopTab] = useState('All Watches')
  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const [loadedBrandLogos, setLoadedBrandLogos] = useState<Record<string, boolean>>({})

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    const navHeight = 110
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleTopTabClick = (tab: string) => {
    setActiveTopTab(tab)
    if (tab === 'Visit LUXE') return scrollToSection('home')
    if (tab === 'All Watches') {
      setSelectedCategory('All')
      setSearchTerm('')
      setSelectedStrapMaterial('All')
      return scrollToSection('collection')
    }
    if (tab === 'Women') return scrollToSection('women-section')
    if (tab === 'Men') return scrollToSection('men-section')
    if (tab === 'Smart') return scrollToSection('smart-section')
    if (tab === 'Brands') return scrollToSection('brands-section')
    if (tab === 'Stores') return scrollToSection('stores-section')
    if (tab === 'Gallery') return scrollToSection('gallery-section')
    if (tab === 'Offers') {
      setSortBy('price-low')
      return scrollToSection('offers-section')
    }
  }

  const catalogProducts = useMemo(() => {
    let list = [...products]
    if (selectedCategory !== 'All') list = list.filter((p) => p.category === selectedCategory)
    if (selectedStrapMaterial !== 'All') list = list.filter((p) => p.strapMaterial === selectedStrapMaterial)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }
    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [searchTerm, selectedCategory, selectedStrapMaterial, sortBy])

  useEffect(() => {
    const q = gsap.utils.selector(document.body)
    gsap.fromTo(
      q('.reveal'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.16, scrollTrigger: { trigger: '.reveal-wrap', start: 'top 80%' } },
    )

    if (heroRef.current) {
      const el = heroRef.current
      const move = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24
        gsap.to('.hero-watch', { x, duration: 0.9, ease: 'power3.out' })
      }
      el.addEventListener('mousemove', move)
      const heroTween = gsap.to('.hero-bg-track', {
        xPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => {
        el.removeEventListener('mousemove', move)
        heroTween.scrollTrigger?.kill()
        heroTween.kill()
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroBackgroundImages.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setQuickViewProduct(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.href.replace('#', ''))
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const onScroll = () => {
      const scrollPos = window.scrollY + 140
      for (const section of sections) {
        const top = section.offsetTop
        const bottom = top + section.offsetHeight
        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(section.id)
          break
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site">
      <header className="nav glass">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>KRISCEL WATCHES</a>
        <div className="top-tabs">
          {topTabs.map((tab) => (
            <button key={tab} type="button" className={activeTopTab === tab ? 'active' : ''} onClick={() => handleTopTabClick(tab)}>{tab}</button>
          ))}
        </div>
      </header>

      <section id="home" className="hero" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-banner"
        >
          <div className="hero-bg-track">
            <AnimatePresence mode="wait">
              <motion.img
                key={heroBackgroundImages[heroImageIndex]}
                className="hero-bg-image"
                src={heroBackgroundImages[heroImageIndex]}
                alt="Luxury women watch hero background"
                style={{ objectPosition: heroImageIndex === 0 ? '70% center' : 'center center' }}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1.06 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </div>
          <div className="hero-overlay">
            <div className="hero-copy">
              <p className="tag">Luxury Watches</p>
              <h1>Timeless Luxury For Modern Style</h1>
              <p>Rose gold brilliance, diamond accents, and couture-grade finishing in every curve.</p>
              <div className="hero-cta">
                <a className="btn" href="#collection" onClick={(e) => { e.preventDefault(); scrollToSection('collection') }}>Explore Collection</a>
                <a className="btn secondary" href="#best-sellers" onClick={(e) => { e.preventDefault(); scrollToSection('best-sellers') }}>View Best Sellers</a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="marquee-wrap">
        <div className="marquee">
          <div className="marquee-track">
            {brands.map((b, i) => <span key={`a-${i}`}>{b.name}</span>)}
          </div>
          <div className="marquee-track" aria-hidden="true">
            {brands.map((b, i) => <span key={`b-${i}`}>{b.name}</span>)}
          </div>
        </div>
      </section>

      <section id="collection" className="section reveal-wrap">
        <h2 className="reveal">Featured Collection</h2>
        <div data-lenis-prevent>
          <Swiper
            modules={[Autoplay, Mousewheel]}
            autoplay={{ delay: 2400 }}
            mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
            grabCursor
            touchStartPreventDefault={false}
            slidesPerView={1.15}
            spaceBetween={20}
            breakpoints={{ 768: { slidesPerView: 2.4 }, 1024: { slidesPerView: 3.3 } }}
          >
            {products.slice(0, 4).map((p) => (
              <SwiperSlide key={p.name}>
                <div className="product-card reveal glass">
                  <img src={p.img} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p className="product-subline">{p.brand} • {p.strapMaterial} • {detailByCategory[p.category].waterRes}</p>
                  <div className="offer-price-row premium-price">
                    <p>{formatPrice(p.price)}</p>
                    <span>{formatPrice(p.originalPrice)}</span>
                    <b>{getDiscount(p.price, p.originalPrice)}% OFF</b>
                  </div>
                  <button className="btn secondary" onClick={() => setQuickViewProduct(p)}>Quick View</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="men-section" className="section reveal-wrap top-target">
        <h2 className="reveal">Men Collection</h2>
        <div className="catalog-grid men-grid">
          {products.filter((p) => p.category === 'Rose Gold').map((p) => (
            <article key={`men-${p.name}`} className="catalog-card men-card reveal" onClick={() => setQuickViewProduct(p)}>
              <img src={p.img} alt={p.name} />
              <p className="catalog-brand">{p.brand}</p>
              <h4>{p.name}</h4>
              <p className="product-subline">{p.brand} • {p.strapMaterial} • {detailByCategory[p.category].waterRes}</p>
              <p className="catalog-cat">Men&apos;s Premium</p>
              <div className="premium-price">
                <p className="catalog-price">{formatPrice(p.price)}</p>
                <p className="catalog-original">{formatPrice(p.originalPrice)}</p>
                <span className="catalog-offer">{getDiscount(p.price, p.originalPrice)}% OFF</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="women-section" className="section reveal-wrap top-target">
        <h2 className="reveal">Women Collection</h2>
        <div className="catalog-grid">
          {products.filter((p) => p.category === 'Fashion' || p.category === 'Diamond').map((p) => (
            <article key={`women-${p.name}`} className="catalog-card reveal" onClick={() => setQuickViewProduct(p)}>
              <img src={p.img} alt={p.name} />
              <p className="catalog-brand">{p.brand}</p>
              <h4>{p.name}</h4>
              <p className="product-subline">{p.brand} • {p.strapMaterial} • {detailByCategory[p.category].waterRes}</p>
              <p className="catalog-cat">{p.category}</p>
              <div className="premium-price">
                <p className="catalog-price">{formatPrice(p.price)}</p>
                <p className="catalog-original">{formatPrice(p.originalPrice)}</p>
                <span className="catalog-offer">{getDiscount(p.price, p.originalPrice)}% OFF</span>
              </div>
              <button
                type="button"
                className="btn secondary view-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setQuickViewProduct(p)
                }}
              >
                View
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="smart-section" className="section reveal-wrap top-target">
        <h2 className="reveal">Smart Watches</h2>
        <div className="catalog-grid">
          {products.filter((p) => p.category === 'Smart').map((p) => (
            <article key={`smart-${p.name}`} className="catalog-card reveal" onClick={() => setQuickViewProduct(p)}>
              <img src={p.img} alt={p.name} onError={(e) => { e.currentTarget.src = fallbackImage }} />
              <p className="catalog-brand">{p.brand}</p>
              <h4>{p.name}</h4>
              <p className="product-subline">{p.brand} • {p.strapMaterial} • {detailByCategory[p.category].waterRes}</p>
              <p className="catalog-cat">Connected Luxury</p>
              <div className="premium-price">
                <p className="catalog-price">{formatPrice(p.price)}</p>
                <p className="catalog-original">{formatPrice(p.originalPrice)}</p>
                <span className="catalog-offer">{getDiscount(p.price, p.originalPrice)}% OFF</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="brands-section" className="section reveal-wrap top-target">
        <h2 className="reveal">Brands</h2>
        <div className="brand-grid">
          {brands.map((b) => (
            <button key={b.name} type="button" className="brand-chip" onClick={() => { setSearchTerm(b.name.toLowerCase()); scrollToSection('collection') }}>
              <img
                className="brand-logo"
                src={b.logo}
                alt={`${b.name} logo`}
                loading="lazy"
                onLoad={() => setLoadedBrandLogos((prev) => ({ ...prev, [b.name]: true }))}
                onError={(e) => {
                  setLoadedBrandLogos((prev) => ({ ...prev, [b.name]: false }))
                  e.currentTarget.style.display = 'none'
                }}
              />
              {!loadedBrandLogos[b.name] && <span className="brand-label">{b.name}</span>}
            </button>
          ))}
        </div>
      </section>

      <section id="stores-section" className="section reveal-wrap top-target">
        <h2 className="reveal">Stores</h2>
        <div className="store-grid">
          <article className="store-card glass reveal"><h4>Mumbai Atelier</h4><p>Linking Road, Bandra West</p><small>10:00 AM - 9:00 PM</small></article>
          <article className="store-card glass reveal"><h4>Delhi Gallery</h4><p>DLF Emporio, Vasant Kunj</p><small>11:00 AM - 9:30 PM</small></article>
          <article className="store-card glass reveal"><h4>Bangalore Studio</h4><p>UB City, Vittal Mallya Rd</p><small>10:30 AM - 9:00 PM</small></article>
        </div>
      </section>

      <section id="offers-section" className="section reveal-wrap top-target">
        <h2 className="reveal">Offers</h2>
        <div className="catalog-grid">
          {products.filter((p) => getDiscount(p.price, p.originalPrice) >= 20).map((p) => (
            <article key={`offer-${p.name}`} className="catalog-card reveal" onClick={() => setQuickViewProduct(p)}>
              <img src={p.img} alt={p.name} />
              <p className="catalog-brand">{p.brand}</p>
              <h4>{p.name}</h4>
              <p className="product-subline">{p.brand} • {p.strapMaterial} • {detailByCategory[p.category].waterRes}</p>
              <p className="catalog-cat">Limited Time Deal</p>
              <div className="premium-price">
                <p className="catalog-price">{formatPrice(p.price)}</p>
                <p className="catalog-original">{formatPrice(p.originalPrice)}</p>
                <span className="catalog-offer">{getDiscount(p.price, p.originalPrice)}% OFF</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-section section reveal-wrap">
        <div className="catalog-banner reveal">
          <img src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1800&q=80" alt="Women's watches banner" />
          <div className="catalog-banner-overlay">
            <p>Women&apos;s Watches</p>
            <h3>Luxury Catalog Experience</h3>
          </div>
        </div>

        <div className="strap-filter glass reveal">
          <div className="strap-filter-head">
            <p>Filter By Strap Material</p>
            {selectedStrapMaterial !== 'All' && (
              <button type="button" onClick={() => setSelectedStrapMaterial('All')}>Clear</button>
            )}
          </div>
          <div className="strap-filter-track">
            <button type="button" className={selectedStrapMaterial === 'All' ? 'active' : ''} onClick={() => setSelectedStrapMaterial('All')}>All</button>
            {strapMaterialFilters.map((material) => (
              <button
                key={material}
                type="button"
                className={selectedStrapMaterial === material ? 'active' : ''}
                onClick={() => setSelectedStrapMaterial(material)}
              >
                {material}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-controls glass reveal">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Rose Gold">Rose Gold</option>
            <option value="Diamond">Diamond</option>
            <option value="Fashion">Fashion</option>
            <option value="Smart">Smart</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>

          <input type="text" placeholder="Search watch or brand" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          <span>{catalogProducts.length} Products</span>
        </div>

        <div className="catalog-grid">
          {catalogProducts.map((p) => (
            <article key={`catalog-${p.name}`} className="catalog-card reveal" onClick={() => setQuickViewProduct(p)}>
              <img src={p.img} alt={p.name} />
              <p className="catalog-brand">{p.brand}</p>
              <h4>{p.name}</h4>
              <p className="product-subline">{p.brand} • {p.strapMaterial} • {detailByCategory[p.category].waterRes}</p>
              <p className="catalog-cat">{p.category}</p>
              <div className="premium-price">
                <p className="catalog-price">{formatPrice(p.price)}</p>
                <p className="catalog-original">{formatPrice(p.originalPrice)}</p>
                <span className="catalog-offer">{getDiscount(p.price, p.originalPrice)}% OFF</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="luxury-series" className="section center showcase reveal-wrap">
        <h2 className="reveal">Watch Showcase</h2>
        <Swiper effect="coverflow" centeredSlides loop slidesPerView={1.2} modules={[EffectCoverflow, Autoplay]} autoplay={{ delay: 2200 }} coverflowEffect={{ rotate: 20, depth: 120, stretch: 0 }} breakpoints={{ 900: { slidesPerView: 2.2 } }}>
          {products.map((p) => <SwiperSlide key={`show-${p.name}`}><img className="show-img reveal" src={p.img} alt={p.name} /></SwiperSlide>)}
        </Swiper>
      </section>

      <section id="about" className="section perks reveal-wrap">
        {[{ t: 'Free Shipping', i: <FaShippingFast /> }, { t: '24K Gold Finish', i: <MdOutlineWorkspacePremium /> }, { t: 'Premium Packaging', i: <MdDiamond /> }, { t: '2 Year Warranty', i: <FaAward /> }].map((p) => <div key={p.t} className="perk reveal glass">{p.i}<h4>{p.t}</h4></div>)}
      </section>

      <section id="gallery-section" className="section insta reveal-wrap">
        <p className="tag reveal">Gallery</p>
        <div className="masonry">
          {products.concat(products).map((p, i) => <img className="reveal" key={i} src={p.img} alt="gallery" />)}
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-col">
          <h3>Kriscel Watches</h3>
          <p>Luxury women watches with fashion-forward elegance.</p>
          <p><strong>Email:</strong> support@kriscelwatches.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> UB City, Vittal Mallya Rd, Bengaluru</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#collection">Collection</a></li>
            <li><a href="#women-section">Women Collection</a></li>
            <li><a href="#smart-section">Smart Watches</a></li>
            <li><a href="#offers-section">Offers</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul className="footer-links">
            <li><p>Shipping & Delivery</p></li>
            <li><p>Returns & Exchange</p></li>
            <li><p>Warranty Registration</p></li>
            <li><p>Track Your Order</p></li>
            <li><p>Mon - Sat: 10:00 AM - 8:00 PM</p></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <div className="newsletter glass"><input placeholder="Your email" /><button className="btn">Join</button></div>
          <div className="socials"><FaInstagram /><FaFacebookF /></div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Kriscel Watches. All rights reserved.</p>
          <p>Privacy Policy | Terms & Conditions</p>
        </div>
      </footer>

      {quickViewProduct && (
        <div className="quick-view-overlay" onClick={() => setQuickViewProduct(null)}>
          <motion.div className="quick-view-modal glass" initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()}>
            <button className="quick-close" onClick={() => setQuickViewProduct(null)} aria-label="Close quick view">×</button>
            <img src={quickViewProduct.img} alt={quickViewProduct.name} />
            <div className="quick-view-content">
              <p className="tag">Kriscel Signature</p>
              <h3>{quickViewProduct.name}</h3>
              <p className="quick-view-subline">{quickViewProduct.brand} • {quickViewProduct.category} • {quickViewProduct.strapMaterial}</p>
              <p>{formatPrice(quickViewProduct.price)}</p>
              <p className="catalog-original">{formatPrice(quickViewProduct.originalPrice)}</p>
              <span className="catalog-offer">{getDiscount(quickViewProduct.price, quickViewProduct.originalPrice)}% OFF</span>
              <p>Rose gold body, diamond accents, and precision movement crafted for modern elegance.</p>
              <div className="quick-view-specs">
                <div><strong>Movement</strong><small>{detailByCategory[quickViewProduct.category].movement}</small></div>
                <div><strong>Strap Design</strong><small>{detailByCategory[quickViewProduct.category].strap}</small></div>
                <div><strong>Strap Material</strong><small>{quickViewProduct.strapMaterial}</small></div>
                <div><strong>Water Resistance</strong><small>{detailByCategory[quickViewProduct.category].waterRes}</small></div>
                <div><strong>Battery</strong><small>{detailByCategory[quickViewProduct.category].battery}</small></div>
                <div><strong>Warranty</strong><small>2 Year International</small></div>
                <div><strong>Delivery</strong><small>Express: 2-4 Days</small></div>
              </div>
              <button className="btn">Enquire Now</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
