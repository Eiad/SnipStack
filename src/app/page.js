"use client";

import Image from "next/image";
import snippetsData from "./data/snippets.json";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import { Copy, Check, Code2, Search, X } from "lucide-react";

export default function Home() {
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSnippets = useMemo(() => {
    if (!searchQuery.trim()) return snippetsData.snippets;
    
    const query = searchQuery.toLowerCase();
    return snippetsData.snippets.filter(snippet => 
      snippet.title.toLowerCase().includes(query) ||
      snippet.description.toLowerCase().includes(query) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8">
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 dark:from-violet-500/10 dark:via-fuchsia-500/10 dark:to-cyan-500/10 rounded-2xl blur-2xl -z-10" />
        
        <div className="relative overflow-hidden rounded-2xl border border-black/[.06] dark:border-white/[.06] bg-white/50 dark:bg-black/20 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-violet-500/10 via-fuchsia-500/5 to-transparent dark:from-violet-500/20" />
          
          <div className="px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 dark:from-violet-400/20 dark:to-cyan-400/20 rounded-xl border border-black/[.06] dark:border-white/[.06] backdrop-blur-sm">
                  <Code2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                    ⚡️ SnipStack ⚡️ 
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mb-3">
                    Discover a curated collection of battle-tested code snippets for React, Next.js, TypeScript, and more. Each snippet is crafted with best practices and real-world experience.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5 bg-green-500/10 dark:bg-green-500/20 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                      Front End Development
                    </span>                    
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800/50 rounded-full">Open Source</span>
                  </div>
                </div>
              </div>

              <div className="relative group self-start md:self-center">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 dark:from-violet-400/20 dark:to-cyan-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find magic ✨"
                    className="pl-9 pr-9 py-2.5 rounded-xl bg-white dark:bg-gray-800/50 border border-black/[.06] dark:border-white/[.06] focus:outline-none focus:ring-2 focus:ring-violet-500/20 w-[500px] text-sm transition-all duration-200 placeholder-gray-400"
                  />
                  {searchQuery && (
                    <div className="absolute right-3 -bottom-6 text-xs text-gray-500">
                      {filteredSnippets.length} gem{filteredSnippets.length !== 1 ? 's' : ''} found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSnippets.map((snippet) => (
          <div
            key={snippet.id}
            onClick={() => setSelectedSnippet(snippet)}
            className="border border-black/[.08] dark:border-white/[.145] rounded-lg p-4 
                     hover:border-transparent hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
                     transition-all duration-200 cursor-pointer group h-[400px] 
                     hover:shadow-lg relative flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-semibold text-lg">{snippet.title}</h2>
              <div className="flex gap-2 flex-wrap">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-black/[.05] dark:bg-white/[.06] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {snippet.description}
            </p>
            <div className="relative flex-1 overflow-hidden">
              <pre className="bg-black/[.05] dark:bg-white/[.06] p-3 rounded-md h-full">
                <code className="text-sm font-mono line-clamp-[12]">{snippet.code}</code>
              </pre>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
            </div>
          </div>
        ))}
        {filteredSnippets.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <Search className="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-lg font-medium">No snippets found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        )}
      </main>

      <Dialog open={!!selectedSnippet} onOpenChange={() => setSelectedSnippet(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          {selectedSnippet && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="text-xl">{selectedSnippet.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(selectedSnippet.code);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy code'}</span>
                  </button>
                </DialogTitle>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedSnippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-black/[.05] dark:bg-white/[.06] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {selectedSnippet.description}
                </p>
                <pre className="bg-black/[.05] dark:bg-white/[.06] p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono whitespace-pre-wrap break-words">
                    {selectedSnippet.code}
                  </code>
                </pre>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="flex flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <a
            href="https://i-ash.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            i-ash.com
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/ash-creates-tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <span className="text-red-500">❤️</span>
          <span>by Ash © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
