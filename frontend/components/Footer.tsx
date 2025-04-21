import Link from "next/link"

// export default function Footer() {
//   return (
//     <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
//       <div className="container mx-auto px-4 py-6">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
//             © {new Date().getFullYear()} CrowdCure. All rights reserved.
//           </div>
//           <nav>
//             <ul className="flex space-x-6">
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/privacy"
//                   className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                 >
//                   Privacy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/terms"
//                   className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                 >
//                   Terms
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </footer>
//   )
// }
"use client"

import { useEffect, useState } from "react"
// import Link from "next/link"

export default function Footer() {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            {year ? `© ${year} CrowdCure. All rights reserved.` : null}
          </div>
          {/* ... rest of nav */}
        </div>
      </div>
    </footer>
  )
}
