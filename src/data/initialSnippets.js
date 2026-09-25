/**
 * Initial curated snippets for CodeSnippet Vault
 * High-quality developer snippets showcasing practical patterns
 */
export const INITIAL_SNIPPETS = [
  {
    id: 'snip-1',
    title: 'useDebounce Custom React Hook',
    description: 'A performant debouncing hook for search inputs, resize listeners, and autocomplete queries.',
    language: 'react',
    tags: ['React', 'Hooks', 'Utility', 'Frontend'],
    isFavorite: true,
    createdAt: '2026-03-15T10:30:00.000Z',
    updatedAt: '2026-03-15T10:30:00.000Z',
    code: `import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any fast-changing value
 * @param {any} value - The input value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: 'snip-2',
    title: 'LRU Cache Implementation',
    description: 'Clean Least-Recently-Used (LRU) Cache in Python using OrderedDict with O(1) get and put.',
    language: 'python',
    tags: ['Python', 'DSA', 'Algorithms', 'Interview'],
    isFavorite: true,
    createdAt: '2026-03-18T14:15:00.000Z',
    updatedAt: '2026-03-18T14:15:00.000Z',
    code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move key to the end to record recent access
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Evict first (oldest) item
            self.cache.popitem(last=False)`
  },
  {
    id: 'snip-3',
    title: 'TypeScript DeepPartial & Prettify Helpers',
    description: 'Essential TypeScript type utilities to recursively make all properties optional and clean up hover tooltips.',
    language: 'typescript',
    tags: ['TypeScript', 'Utility', 'Frontend'],
    isFavorite: false,
    createdAt: '2026-03-20T08:00:00.000Z',
    updatedAt: '2026-03-20T08:00:00.000Z',
    code: `// Recursively makes nested object fields optional
export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? _DeepPartialArray<U>
  : T extends object
  ? _DeepPartialObject<T>
  : T | undefined;

type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };
interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}

// Flattens intersection types for crisp, readable IDE intellisense
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};`
  },
  {
    id: 'snip-4',
    title: 'Async Express Error Handling Middleware',
    description: 'Global error handler with structured status codes and development stack trace masking.',
    language: 'nodejs',
    tags: ['Node.js', 'Backend', 'API'],
    isFavorite: false,
    createdAt: '2026-03-21T18:40:00.000Z',
    updatedAt: '2026-03-21T18:40:00.000Z',
    code: `// Express global error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  console.error(\`[\${req.method}] \${req.originalUrl} - \${err.message}\`);

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(isProduction ? {} : { stack: err.stack }),
    },
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;`
  },
  {
    id: 'snip-5',
    title: 'Hierarchical Category Tree with Recursive CTE',
    description: 'PostgreSQL / MySQL 8 query to fetch breadcrumb paths and tree depths in a single query.',
    language: 'sql',
    tags: ['SQL', 'Database', 'Backend'],
    isFavorite: true,
    createdAt: '2026-03-22T09:20:00.000Z',
    updatedAt: '2026-03-22T09:20:00.000Z',
    code: `WITH RECURSIVE CategoryTree AS (
  -- Anchor member: root categories
  SELECT 
    id, 
    name, 
    parent_id, 
    0 AS depth, 
    CAST(name AS CHAR(255)) AS path
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  -- Recursive member: child categories
  SELECT 
    c.id, 
    c.name, 
    c.parent_id, 
    ct.depth + 1, 
    CONCAT(ct.path, ' > ', c.name)
  FROM categories c
  INNER JOIN CategoryTree ct ON c.parent_id = ct.id
)
SELECT id, name, depth, path 
FROM CategoryTree
ORDER BY path ASC;`
  },
  {
    id: 'snip-6',
    title: 'Binary Search with Lower & Upper Bound',
    description: 'Idiomatic C++ binary search finding the first and last position of an element in a sorted array.',
    language: 'cpp',
    tags: ['C++', 'DSA', 'Algorithms', 'Interview'],
    isFavorite: false,
    createdAt: '2026-03-23T11:05:00.000Z',
    updatedAt: '2026-03-23T11:05:00.000Z',
    code: `#include <vector>
#include <iostream>

int lowerBound(const std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    int ans = arr.size();

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) {
            ans = mid;
            high = mid - 1; // Look left
        } else {
            low = mid + 1;  // Look right
        }
    }
    return ans;
}`
  },
  {
    id: 'snip-7',
    title: 'Thread-Safe Double-Checked Singleton',
    description: 'Robust thread-safe Singleton pattern in Java using volatile variable and synchronized block.',
    language: 'java',
    tags: ['Java', 'Interview', 'Backend'],
    isFavorite: false,
    createdAt: '2026-03-24T15:30:00.000Z',
    updatedAt: '2026-03-24T15:30:00.000Z',
    code: `public class DatabaseConnectionPool {
    // Volatile prevents instruction reordering issues
    private static volatile DatabaseConnectionPool instance;

    private DatabaseConnectionPool() {
        // Prevent reflection instantiation
        if (instance != null) {
            throw new RuntimeException("Use getInstance() method to create");
        }
    }

    public static DatabaseConnectionPool getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnectionPool.class) {
                if (instance == null) {
                    instance = new DatabaseConnectionPool();
                }
            }
        }
        return instance;
    }
}`
  },
  {
    id: 'snip-8',
    title: 'Modern CSS Glassmorphism Card Effect',
    description: 'Clean backdrop-filter glass card with subtle border highlight and ambient elevation glow.',
    language: 'css',
    tags: ['CSS', 'Frontend', 'CSS Tricks'],
    isFavorite: true,
    createdAt: '2026-03-25T16:10:00.000Z',
    updatedAt: '2026-03-25T16:10:00.000Z',
    code: `.glass-panel {
  background: rgba(18, 24, 38, 0.7);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-panel:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 
    0 8px 32px -2px rgba(99, 102, 241, 0.15),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
}`
  }
];
