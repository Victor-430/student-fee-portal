// import React from "react";
// import { motion } from "framer-motion";

// interface ErrorPageProps {
//   error?: Error;
//   errorInfo?: React.ErrorInfo;
//   resetError?: () => void;
// }

// export const ErrorPage: React.FC<ErrorPageProps> = ({
//   error,
//   errorInfo,
//   resetError,
// }) => {
//   const handleRefresh = (): void => {
//     window.location.reload();
//   };

//   const handleGoHome = (): void => {
//     window.location.href = "/";
//   };

//   const handleReportError = (): void => {
//     // You can implement error reporting logic here
//     console.log("Error reported:", { error, errorInfo });
//     // Example: Send to error tracking service
//     // errorTrackingService.report({ error, errorInfo });
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4, ease: "easeOut" },
//     },
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.2 },
//     },
//     tap: {
//       scale: 0.95,
//       transition: { duration: 0.1 },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
//       <motion.div
//         className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Error Icon */}
//         <motion.div
//           className="mx-auto mb-8 w-24 h-24 bg-red-100 rounded-full flex items-center justify-center"
//           variants={itemVariants}
//           whileHover={{ rotate: 10 }}
//           transition={{ duration: 0.3 }}
//         >
//           <svg
//             className="w-12 h-12 text-red-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
//             />
//           </svg>
//         </motion.div>

//         {/* Error Title */}
//         <motion.h1
//           className="text-4xl font-bold text-gray-800 mb-4"
//           variants={itemVariants}
//         >
//           Oops! Something went wrong
//         </motion.h1>

//         {/* Error Description */}
//         <motion.p
//           className="text-lg text-gray-600 mb-8 leading-relaxed"
//           variants={itemVariants}
//         >
//           We're sorry for the inconvenience. An unexpected error has occurred.
//           Don't worry, our team has been notified and we're working to fix it.
//         </motion.p>

//         {/* Error Details (Development Mode) */}
//         {process.env.NODE_ENV === "development" && error && (
//           <motion.div
//             className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left"
//             variants={itemVariants}
//           >
//             <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
//             <pre className="text-sm text-red-700 overflow-x-auto whitespace-pre-wrap">
//               {error.toString()}
//             </pre>
//             {errorInfo && (
//               <details className="mt-2">
//                 <summary className="cursor-pointer text-red-800 font-medium">
//                   Component Stack
//                 </summary>
//                 <pre className="text-xs text-red-600 mt-2 overflow-x-auto whitespace-pre-wrap">
//                   {errorInfo.componentStack}
//                 </pre>
//               </details>
//             )}
//           </motion.div>
//         )}

//         {/* Action Buttons */}
//         <motion.div
//           className="flex flex-col sm:flex-row gap-4 justify-center"
//           variants={itemVariants}
//         >
//           {resetError && (
//             <motion.button
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={resetError}
//             >
//               Try Again
//             </motion.button>
//           )}

//           <motion.button
//             className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={handleRefresh}
//           >
//             Refresh Page
//           </motion.button>

//           <motion.button
//             className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={handleGoHome}
//           >
//             Go Home
//           </motion.button>
//         </motion.div>

//         {/* Additional Actions */}
//         <motion.div
//           className="mt-8 pt-6 border-t border-gray-200"
//           variants={itemVariants}
//         >
//           <p className="text-sm text-gray-500 mb-4">
//             If this problem persists, please let us know.
//           </p>
//           <motion.button
//             className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleReportError}
//           >
//             Report this error
//           </motion.button>
//         </motion.div>

//         {/* Footer */}
//         <motion.div
//           className="mt-8 text-xs text-gray-400"
//           variants={itemVariants}
//         >
//           <p>Error ID: {Date.now().toString(36)}</p>
//           <p>Timestamp: {new Date().toLocaleString()}</p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// // Error Boundary Component
// interface ErrorBoundaryState {
//   hasError: boolean;
//   error?: Error;
//   errorInfo?: React.ErrorInfo;
// }

// export class ErrorBoundary extends React.Component<
//   React.PropsWithChildren<{}>,
//   ErrorBoundaryState
// > {
//   constructor(props: React.PropsWithChildren<{}>) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//     console.error("Error caught by boundary:", error, errorInfo);
//     this.setState({ error, errorInfo });
//   }

//   resetError = (): void => {
//     this.setState({ hasError: false, error: undefined, errorInfo: undefined });
//   };

//   render(): React.ReactNode {
//     if (this.state.hasError) {
//       return (
//         <ErrorPage
//           error={this.state.error}
//           errorInfo={this.state.errorInfo}
//           resetError={this.resetError}
//         />
//       );
//     }

//     return this.props.children;
//   }
// }

// // Usage Example:
// //
// // Wrap your app or components with ErrorBoundary:
// //
// // <ErrorBoundary>
// //   <App />
// // </ErrorBoundary>
// //
// // Or use it for specific components:
// //
// // <ErrorBoundary>
// //   <SomeComponent />
// // </ErrorBoundary>
