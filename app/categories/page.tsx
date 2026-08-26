"use client"
import { Input } from "@/components/ui/input";
import { library } from "@/app/classes/library";
import { useEffect, useState } from 'react'
import { SearchResult } from "./actions";
import { Product } from "./types";
import Image from "next/image";


const useDebounce = (val: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(val)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(val)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [val, delay])
  return debouncedValue
}

export default function CategoriesPage() {
  const [query, setQuery] = useState("")
  const debouceEmail = useDebounce(query, 500)
  const [data, setData] = useState<Product[]>([])
  useEffect(() => {
    if (debouceEmail.length > 0) {
      const fetchData = async () => {
        try {
          const data = await SearchResult()
          if (data.length > 0) {
            setData(data)
            return data
          }
        } catch (error) {
          return error
        }
      }
      fetchData()
    }
  }, [debouceEmail])
  return (
    <div className={library.view}>
      <header className={library.head}>
        <h1 className={library.headTitle}>Categories</h1>
        <p className={library.headSub}>Add a category.</p>
      </header>

      <Input
        type="text"
        name="category"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Query"
        aria-label="Query"
        className="min-h-12 target:rounded-[(--radius-pill)] min-w-[240px] flex-1 px-[14px] text-[length:var(--text-base)]"
      />
      <div className="grid grid-cols-3 mt-6 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
              <Image
                width={250}
                height={200}
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="mb-1 text-xs font-medium uppercase text-gray-500">
                {item.category}
              </p>

              <h2 className="mb-2 line-clamp-1 text-lg font-semibold">
                {item.title}
              </h2>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${item.price}
                </span>

                <span className="text-sm text-gray-600">
                  ⭐ {item.rating}
                </span>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
        <div className=""></div>
      </div>
    </div>
  );
}
