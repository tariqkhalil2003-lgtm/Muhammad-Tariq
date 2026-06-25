/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Search, 
  Settings, 
  BrainCircuit, 
  DollarSign, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  FlaskConical,
  Sliders,
  Award,
  Code,
  Copy,
  Check,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  Flame,
  Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

// Mock Data
const SALES_DATA = [
  { name: 'Mon', sales: 4000, profit: 2400 },
  { name: 'Tue', sales: 3000, profit: 1398 },
  { name: 'Wed', sales: 2000, profit: 9800 },
  { name: 'Thu', sales: 2780, profit: 3908 },
  { name: 'Fri', sales: 1890, profit: 4800 },
  { name: 'Sat', sales: 2390, profit: 3800 },
  { name: 'Sun', sales: 3490, profit: 4300 },
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'order', message: 'New order from London, UK', time: '2 mins ago', amount: '$45.00' },
  { id: 2, type: 'automation', message: 'AI adjusted bidding for TikTok Ads', time: '15 mins ago', amount: null },
  { id: 3, type: 'order', message: 'New order from New York, US', time: '45 mins ago', amount: '$120.50' },
  { id: 4, type: 'fulfillment', message: 'Order #8291 fulfilled automatically', time: '1 hour ago', amount: null },
];

const WINNING_PRODUCTS = [
  { id: 1, name: "Ergonomic Lumbar Support", niche: "Home Office", orders: 1240, trend: "+12%", status: "Scaling" },
  { id: 2, name: "Portable Blender Pro", niche: "Fitness", orders: 850, trend: "+5%", status: "Active" },
  { id: 3, name: "Anti-Gravity Humidifier", niche: "Home Decor", orders: 2100, trend: "+45%", status: "Viral" },
  { id: 4, name: "Smart Pet Water Fountain", niche: "Pets", orders: 620, trend: "-2%", status: "Stable" },
];

interface DiscoveredProduct {
  name: string;
  description: string;
  niche: string;
  sourcingCost: number;
  targetPrice: number;
  demandScore: number;
  competitionScore: number;
  marginScore: number;
  wowFactorScore: number;
  overallScore: number;
  whyWinning: string;
  winningSignals: string[];
  marketingStrategy: string;
  suggestedTools: string[];
  automationMethod: string;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Custom Scouting parameters
  const [nicheInput, setNicheInput] = useState('Smart Kitchen Accessories');
  const [minDemand, setMinDemand] = useState(75);
  const [minMargin, setMinMargin] = useState(25);
  const [maxCompetition, setMaxCompetition] = useState(35);
  const [wowFactor, setWowFactor] = useState(80);
  const [isScouting, setIsScouting] = useState(false);
  const [scoutedProducts, setScoutedProducts] = useState<DiscoveredProduct[]>([]);
  const [scoutingError, setScoutingError] = useState<string | null>(null);

  // Script copy helper state
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!searchQuery) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const response = await fetch("/api/product-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: searchQuery }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAnalysis(data.result || "No analysis generated.");
    } catch (err: any) {
      console.error(err);
      setAnalysis(`Error: ${err.message || "Failed to reach server backend"}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleScout = async () => {
    setIsScouting(true);
    setScoutingError(null);
    try {
      const response = await fetch("/api/scout-winning-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: nicheInput,
          minDemand,
          minMargin,
          maxCompetition,
          wowFactorWeight: wowFactor,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.products) {
        setScoutedProducts(data.products);
      } else {
        setScoutingError("Format returned unexpectedly from server.");
      }
    } catch (err: any) {
      console.error(err);
      setScoutingError(err.message || "Scouting request failed.");
    } finally {
      setIsScouting(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  // Sample python automated scraper script template
  const pythonScriptText = `import requests
from playwright.sync_api import sync_playwright
import pandas as pd
import time

def scrape_tiktok_trends(hashtag="aliexpressfinds", min_views=100000):
    print(f"[*] Starting Automated TikTok Scraper for #{hashtag}...")
    winning_products = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(f"https://www.tiktok.com/tag/{hashtag}")
        
        # Scroll down to load trending items automatically
        for _ in range(5):
            page.mouse.wheel(0, 1000)
            time.sleep(1.5)
            
        videos = page.query_selector_all("[data-e2e='challenge-item']")
        for vid in videos:
            try:
                title = vid.query_selector("[data-e2e='challenge-desc']").inner_text()
                views_elem = vid.query_selector("[data-e2e='video-views']")
                views_text = views_elem.inner_text() if views_elem else "0"
                
                # Convert view count string to number (e.g. 1.2M -> 1200000)
                views = parse_views(views_text)
                if views >= min_views:
                    winning_products.append({
                        "Keyword/Context": title[:100],
                        "Trend Score (Views)": views,
                        "Source Channel": "TikTok Finds"
                    })
            except Exception as e:
                continue
                
        browser.close()
        
    df = pd.DataFrame(winning_products)
    df.to_csv("winning_products_automated.csv", index=False)
    print(f"[+] Automated Product Hunt complete. Saved {len(df)} prospective winners!")

def parse_views(val):
    val = val.lower().strip()
    if 'm' in val: return int(float(val.replace('m', '')) * 1000000)
    if 'k' in val: return int(float(val.replace('k', '')) * 1000)
    return int(val) if val.isdigit() else 0

if __name__ == "__main__":
    scrape_tiktok_trends()`;

  // Sample Node.js Puppeteer AliExpress Trend Hunter
  const nodeScriptText = `const puppeteer = require('puppeteer');
const fs = require('fs');

async function huntAliExpressBestSellers(niche = 'ergonomic support') {
  console.log(\`[*] Hunting AliExpress automated list for: \${niche}\`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  await page.goto(\`https://www.aliexpress.com/wholesale?SearchText=\${encodeURIComponent(niche)}\`);
  await page.waitForSelector('.search-item-card', { timeout: 10000 }).catch(() => {});

  const results = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.search-item-card, .list-container a'));
    return items.slice(0, 5).map(item => {
      const title = item.querySelector('.title, h1, h2')?.innerText || 'Unknown Item';
      const priceText = item.querySelector('.price, .current-price')?.innerText || '$0.00';
      const ordersText = item.querySelector('.sales, .order-num')?.innerText || '0 sold';
      
      return {
        title,
        price: parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0,
        approxOrders: parseInt(ordersText.replace(/[^0-9]/g, '')) || 0
      };
    });
  });

  console.log('[+] Scraped potential winners:', results);
  fs.writeFileSync('aliexpress_scraped_trends.json', JSON.stringify(results, null, 2));
  await browser.close();
}

huntAliExpressBestSellers();`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-primary/20">
      {/* Sidebar / Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border hidden md:flex flex-col p-6 z-50">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Zap size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">DropShip AI</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <Package size={20} />
            <span className="font-medium">Products</span>
          </button>
          <button 
            onClick={() => setActiveTab('research')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'research' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <FlaskConical size={20} />
            <span className="font-medium">Research Lab</span>
          </button>
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analysis' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <BrainCircuit size={20} />
            <span className="font-medium">AI Strategy</span>
          </button>
          <button 
            onClick={() => setActiveTab('automation')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'automation' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <Zap size={20} />
            <span className="font-medium">Automation</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground transition-all">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">DropShip Automator</h2>
            <p className="text-muted-foreground">Automating high-demand product scouting and niche profitability.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 bg-white">
              <Globe className="w-3 h-3 mr-2 text-blue-500" />
              Global Reach: Active
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-white">
              <ShieldCheck className="w-3 h-3 mr-2 text-green-500" />
              Auto-Fulfillment: ON
            </Badge>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Goal</CardTitle>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary w-[92%]" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      $45k / $50k Target
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Ad Spend Efficiency</CardTitle>
                    <Zap className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.2x ROAS</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Revenue vs Profit</CardTitle>
                    <CardDescription>Weekly performance breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={SALES_DATA}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                        <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Live updates from your store</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {RECENT_ACTIVITY.map((activity) => (
                        <div key={activity.id} className="flex gap-4">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${activity.type === 'order' ? 'bg-green-500' : 'bg-primary'}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium leading-none">{activity.message}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                              {activity.amount && <span className="text-xs font-bold text-green-600">{activity.amount}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full text-xs text-muted-foreground">
                      View Full Audit Log
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div 
              key="products"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Product Catalog</h3>
                <Button className="gap-2" onClick={() => setActiveTab('research')}>
                  <Sparkles size={16} />
                  Find New Winners
                </Button>
              </div>

              <Card className="border-none shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Niche</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {WINNING_PRODUCTS.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.niche}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'Viral' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.orders}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setSearchQuery(product.name);
                            setActiveTab('analysis');
                          }}>
                            Analyze
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* NEW Tab: Research Lab */}
          {activeTab === 'research' && (
            <motion.div 
              key="research"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-6 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white rounded-full text-xs font-bold">
                    <FlaskConical size={12} />
                    Automated Product Research Lab
                  </div>
                  <h3 className="text-2xl font-bold">Niche Scouting & Discovery</h3>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    Define high-impact winning criteria and let our AI engine scrape, evaluate, and output actionable dropshipping opportunities with instant scores.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="text-xs" onClick={() => {
                    setNicheInput("Smart Home Safety Tools");
                    setMinDemand(80);
                    setMinMargin(30);
                    setMaxCompetition(25);
                  }}>
                    Load Preset
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sliders and Parameters */}
                <Card className="border-none shadow-sm lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Sliders size={18} className="text-primary" />
                      Winning Criteria Weights
                    </CardTitle>
                    <CardDescription>Adjust the threshold coefficients for product evaluation.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Niche Industry</label>
                      <Input 
                        value={nicheInput} 
                        onChange={(e) => setNicheInput(e.target.value)} 
                        placeholder="e.g. Ergonomic Home Office, Pet Toys..."
                        className="bg-muted/50 border-none"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold flex items-center gap-1">
                          Market Demand Threshold
                          <HelpCircle size={12} className="text-muted-foreground cursor-pointer" title="Search volumes and social momentum filter" />
                        </span>
                        <span className="text-primary font-bold">{minDemand}/100</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="95" 
                        value={minDemand}
                        onChange={(e) => setMinDemand(Number(e.target.value))}
                        className="w-full accent-primary" 
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold flex items-center gap-1">
                          Minimum Target Profit Margin
                          <HelpCircle size={12} className="text-muted-foreground cursor-pointer" title="Net markup difference seeking in USD" />
                        </span>
                        <span className="text-primary font-bold">${minMargin} USD</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="75" 
                        value={minMargin}
                        onChange={(e) => setMinMargin(Number(e.target.value))}
                        className="w-full accent-primary" 
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold flex items-center gap-1">
                          Max Competition/Saturation Level
                          <HelpCircle size={12} className="text-muted-foreground cursor-pointer" title="Density of active ad run-times" />
                        </span>
                        <span className="text-primary font-bold">{maxCompetition}/100</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="70" 
                        value={maxCompetition}
                        onChange={(e) => setMaxCompetition(Number(e.target.value))}
                        className="w-full accent-primary" 
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold flex items-center gap-1">
                          Wow Factor / Problem Solver Weight
                          <HelpCircle size={12} className="text-muted-foreground cursor-pointer" title="Perceived value multiplier & hookability" />
                        </span>
                        <span className="text-primary font-bold">{wowFactor}/100</span>
                      </div>
                      <input 
                        type="range" 
                        min="40" 
                        max="95" 
                        value={wowFactor}
                        onChange={(e) => setWowFactor(Number(e.target.value))}
                        className="w-full accent-primary" 
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full gap-2 h-11 text-sm font-bold shadow-lg shadow-primary/20"
                      onClick={handleScout}
                      disabled={isScouting}
                    >
                      {isScouting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Running Auto-Scout...
                        </>
                      ) : (
                        <>
                          <Flame size={16} />
                          Trigger Automated Hunt
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Methods and industry automation methods education panel */}
                <Card className="border-none shadow-sm lg:col-span-2 flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Award size={18} className="text-yellow-500" />
                      Automatic Product Discovery Methodologies
                    </CardTitle>
                    <CardDescription>
                      Actual professional dropshipping frameworks to automate the criteria detection.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <Tabs defaultValue="methods">
                      <TabsList className="bg-muted p-1 rounded-lg w-full grid grid-cols-3">
                        <TabsTrigger value="methods" className="text-xs">Methodology</TabsTrigger>
                        <TabsTrigger value="tiktok" className="text-xs">TikTok Auto Scraper</TabsTrigger>
                        <TabsTrigger value="aliexpress" className="text-xs">AliExpress Scraper</TabsTrigger>
                      </TabsList>

                      <TabsContent value="methods" className="space-y-3 pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-muted/40 rounded-lg space-y-1">
                            <span className="font-bold text-primary block">1. Viral Ad Espionage</span>
                            <p className="text-muted-foreground">Scout Meta and TikTok ad libraries for creative hooks running longer than 14 days with &gt;50k interactions. Signals high ROI &amp; scalability.</p>
                          </div>
                          <div className="p-3 bg-muted/40 rounded-lg space-y-1">
                            <span className="font-bold text-primary block">2. AliExpress Order Acceleration</span>
                            <p className="text-muted-foreground">Poll daily top bestselling lists of subcategories for spikes in weekly velocity (e.g., &gt;30% growth) while avoiding high competition saturation.</p>
                          </div>
                          <div className="p-3 bg-muted/40 rounded-lg space-y-1">
                            <span className="font-bold text-primary block">3. Custom Web Scrapers</span>
                            <p className="text-muted-foreground">Implement automatic scrapers running on cloud schedules (e.g., Python + Playwright or Node.js + Apify) to extract hot trends instantly into your DB.</p>
                          </div>
                          <div className="p-3 bg-muted/40 rounded-lg space-y-1">
                            <span className="font-bold text-primary block">4. Professional Industry Tools</span>
                            <p className="text-muted-foreground">Integrate platforms such as Minea, AdSpy, TikTok Creative Center, Google Trends API, and ImportYeti to automatically stream winning signals.</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="tiktok" className="space-y-2 pt-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Python + Playwright Scheduled Trend Scraper</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => copyToClipboard(pythonScriptText, 'tiktok')}
                          >
                            {copiedScriptId === 'tiktok' ? (
                              <span className="flex items-center gap-1 text-green-500"><Check size={12} /> Copied!</span>
                            ) : (
                              <span className="flex items-center gap-1"><Copy size={12} /> Copy Python Code</span>
                            )}
                          </Button>
                        </div>
                        <pre className="p-3 bg-muted rounded-lg text-[10px] font-mono overflow-auto max-h-[160px] text-muted-foreground leading-normal">
                          {pythonScriptText}
                        </pre>
                      </TabsContent>

                      <TabsContent value="aliexpress" className="space-y-2 pt-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Node.js + Puppeteer Wholesale Trend Analyzer</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => copyToClipboard(nodeScriptText, 'aliexpress')}
                          >
                            {copiedScriptId === 'aliexpress' ? (
                              <span className="flex items-center gap-1 text-green-500"><Check size={12} /> Copied!</span>
                            ) : (
                              <span className="flex items-center gap-1"><Copy size={12} /> Copy Node.js Code</span>
                            )}
                          </Button>
                        </div>
                        <pre className="p-3 bg-muted rounded-lg text-[10px] font-mono overflow-auto max-h-[160px] text-muted-foreground leading-normal">
                          {nodeScriptText}
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Pro Tip:</strong> Run these script files on a daily cron scheduler to automatically build your exclusive supplier-cost advantage tables!
                    </p>
                  </CardFooter>
                </Card>
              </div>

              {/* Scouting Outputs */}
              <AnimatePresence mode="wait">
                {scoutedProducts.length > 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold flex items-center gap-2">
                        <Gauge className="text-primary w-5 h-5 animate-pulse" />
                        AI Discovery Results ({scoutedProducts.length} Winners Scouted)
                      </h4>
                      <Badge variant="secondary" className="px-3 py-1 font-bold">
                        Calculated Overall Fit
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {scoutedProducts.map((prod, index) => {
                        const radarData = [
                          { subject: 'Demand', A: prod.demandScore, fullMark: 100 },
                          { subject: 'Margin', A: prod.marginScore, fullMark: 100 },
                          { subject: 'Saturat.', A: 100 - prod.competitionScore, fullMark: 100 },
                          { subject: 'Wow Factor', A: prod.wowFactorScore, fullMark: 100 },
                        ];

                        return (
                          <Card key={index} className="border-none shadow-md overflow-hidden bg-white flex flex-col justify-between group hover:shadow-lg transition-all duration-200">
                            <div className="bg-gradient-to-r from-primary to-blue-600 p-4 text-white">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">{prod.niche}</span>
                                  <h5 className="font-bold text-lg mt-0.5 group-hover:text-yellow-300 transition-colors">{prod.name}</h5>
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] block opacity-80 font-bold uppercase tracking-wide">Overall Fit</span>
                                  <span className="text-2xl font-black">{prod.overallScore}%</span>
                                </div>
                              </div>
                            </div>

                            <CardContent className="p-5 space-y-4 flex-1">
                              {/* Radar Performance */}
                              <div className="h-[140px] flex justify-center items-center">
                                <ResponsiveContainer width="100%" height="100%">
                                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#6b7280' }} />
                                    <Radar name={prod.name} dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
                                  </RadarChart>
                                </ResponsiveContainer>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-center bg-muted/30 p-2.5 rounded-xl border border-border">
                                <div>
                                  <span className="text-[10px] text-muted-foreground block font-bold uppercase">Sourcing Cost</span>
                                  <span className="text-base font-bold text-green-600">${prod.sourcingCost.toFixed(2)}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-muted-foreground block font-bold uppercase">Suggested Retail</span>
                                  <span className="text-base font-bold text-primary">${prod.targetPrice.toFixed(2)}</span>
                                </div>
                              </div>

                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                {prod.description}
                              </p>

                              <Separator />

                              <div className="space-y-2">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block">Winning Signals</span>
                                <div className="flex flex-wrap gap-1">
                                  {prod.winningSignals.map((sig, sIdx) => (
                                    <Badge key={sIdx} variant="outline" className="text-[10px] px-2 py-0.5 bg-muted/40 font-medium">
                                      {sig}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-1 bg-primary/5 p-2.5 rounded-lg border border-primary/10">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary block">Viral Ad Hook Strategy</span>
                                <p className="text-xs text-[#333] leading-relaxed italic">
                                  "{prod.marketingStrategy}"
                                </p>
                              </div>

                              <div className="space-y-1 bg-yellow-500/5 p-2.5 rounded-lg border border-yellow-500/10">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-600 block">Automation & Sourcing Flow</span>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {prod.automationMethod}
                                </p>
                              </div>
                            </CardContent>

                            <CardFooter className="p-4 bg-muted/20 border-t border-border flex justify-between gap-2">
                              <Button variant="outline" size="sm" className="text-xs w-full" onClick={() => {
                                copyToClipboard(prod.automationMethod, prod.name);
                              }}>
                                Copy Method
                              </Button>
                              <Button size="sm" className="text-xs w-full gap-1" onClick={() => {
                                setSearchQuery(prod.name);
                                setActiveTab('analysis');
                              }}>
                                Deep Strategy
                                <ChevronRight size={12} />
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <Card className="border-dashed border-2 border-muted-foreground/20 p-12 text-center bg-white/50">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                        <Flame size={24} />
                      </div>
                      <h4 className="text-lg font-bold">No active scout products generated yet</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure your criteria sliders and click <strong>"Trigger Automated Hunt"</strong> to instantly brainstorm, grade, and evaluate prospective winners.
                      </p>
                      {scoutingError && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 text-red-600 rounded-lg text-xs text-left">
                          <AlertCircle size={14} className="shrink-0" />
                          <span>{scoutingError}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div 
              key="analysis"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
                  <BrainCircuit size={18} />
                  Secure Server-Side AI Enabled
                </div>
                <h3 className="text-4xl font-bold tracking-tight">Strategic Market Intelligence</h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Enter a product or niche to generate a deep-thinking strategic analysis powered by Gemini 3.5.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="e.g. Smart reusable notebook, Portable espresso maker..." 
                    className="pl-10 h-12 text-lg rounded-xl border-none shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !searchQuery}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    "Generate Report"
                  )}
                </Button>
              </div>

              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border-none shadow-xl bg-white overflow-hidden">
                    <div className="bg-primary p-6 text-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6" />
                        <h4 className="text-xl font-bold">Analysis Report: {searchQuery}</h4>
                      </div>
                      <Badge variant="outline" className="text-white border-white/30">
                        Gemini 3.5 Auto-Analysis
                      </Badge>
                    </div>
                    <CardContent className="p-8">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-[#333] leading-relaxed">
                          {analysis}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-6 bg-muted/30 flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Analysis generated on {new Date().toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Export PDF</Button>
                        <Button size="sm">Apply Strategy</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'automation' && (
            <motion.div 
              key="automation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Auto-Sourcing</CardTitle>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                    <CardDescription>Automatically find the lowest price suppliers for winning products.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe size={18} className="text-blue-500" />
                        <span className="text-sm font-medium">AliExpress Global</span>
                      </div>
                      <Badge>Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe size={18} className="text-orange-500" />
                        <span className="text-sm font-medium">CJ Dropshipping</span>
                      </div>
                      <Badge>Connected</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>AI Ad Manager</CardTitle>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                    <CardDescription>AI-optimized bidding and creative generation for Meta & TikTok Ads.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Budget Utilization</span>
                        <span className="font-bold">84%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[84%]" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">View Creatives</Button>
                      <Button variant="outline" className="flex-1">Adjust Bids</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-sm bg-primary text-white">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Automation Health: 98%</h4>
                    <p className="text-primary-foreground/80">Your store is currently running with minimal manual intervention.</p>
                  </div>
                  <Button variant="secondary" size="lg" className="font-bold">
                    Run System Audit
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
