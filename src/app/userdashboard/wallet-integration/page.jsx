// 'use client';

// import { useState } from 'react';
// import { Wallet, Plus, Trash2, User } from 'lucide-react';

// function Page() {
//   const [metaMaskAccounts, setMetaMaskAccounts] = useState([]);
//   const [massaAccounts, setMassaAccounts] = useState([]);
//   const [isConnecting, setIsConnecting] = useState({ metamask: false, massa: false });

//   const addAddress = (account, type) => {
//     if (type === 'eth' && !metaMaskAccounts.includes(account)) {
//       setMetaMaskAccounts([...metaMaskAccounts, account]);
//     }
//     if (type === 'massa' && !massaAccounts.includes(account)) {
//       setMassaAccounts([...massaAccounts, account]);
//     }
//   };

//   const connectMetaMask = async () => {
//     if (typeof window.ethereum !== 'undefined') {
//       setIsConnecting((prev) => ({ ...prev, metamask: true }));
//       try {
//         const accounts = await window.ethereum.request({
//           method: 'eth_requestAccounts',
//         });
//         addAddress(accounts[0], 'eth');
//       } catch (error) {
//         console.error('MetaMask connection error:', error);
//       } finally {
//         setIsConnecting((prev) => ({ ...prev, metamask: false }));
//       }
//     } else {
//       alert('MetaMask not detected!');
//     }
//   };

//   const connectMassaWallet = async () => {
//     if ((window).massa) {
//       setIsConnecting((prev) => ({ ...prev, massa: true }));
//       try {
//         const accounts = await (window).massa.request({ method: 'wallet_getAccounts' });
//         addAddress(accounts[0], 'massa');
//       } catch (error) {
//         console.error('Massa connection error:', error);
//       } finally {
//         setIsConnecting((prev) => ({ ...prev, massa: false }));
//       }
//     } else {
//       alert('Massa Wallet not detected!');
//     }
//   };

//   const removeAddress = (type, address) => {
//     if (type === 'eth') {
//       setMetaMaskAccounts(metaMaskAccounts.filter((acc) => acc !== address));
//     }
//     if (type === 'massa') {
//       setMassaAccounts(massaAccounts.filter((acc) => acc !== address));
//     }
//   };

//   const formatAddress = (address) => {
//     if (address.length <= 12) return address;
//     return `${address.slice(0, 6)}...${address.slice(-6)}`;
//   };

//   const WalletCard = ({
//     title,
//     accounts,
//     type,
//     color,
//     icon: Icon,
//   }) => (
//     <div className={`rounded-2xl bg-gradient-to-br ${color} p-6 shadow-xl`}>
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <Icon className="w-6 h-6 text-white" />
//           <h3 className="text-xl font-bold text-white">{title}</h3>
//         </div>
//         <div className="bg-white/30 rounded-full px-3 py-1 text-sm font-medium text-white">
//           {accounts.length}
//         </div>
//       </div>

//       <div className="space-y-3">
//         {accounts.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
//               <Wallet className="w-8 h-8 text-white/70" />
//             </div>
//             <p className="text-white/70 text-sm">No addresses connected</p>
//           </div>
//         ) : (
//           accounts.map((account, idx) => (
//             <div
//               key={idx}
//               className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                     <User className="w-4 h-4 text-white" />
//                   </div>
//                   <span className="text-white font-mono text-sm">{formatAddress(account)}</span>
//                 </div>
//                 <button
//                   onClick={() => removeAddress(type, account)}
//                   className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-white/20"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-300 hover:text-red-200" />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
//             <Wallet className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-slate-900 mb-2">Integrate Your Wallets</h1>
//           <p className="text-slate-600">Connect and manage your cryptocurrency wallets easily</p>
//         </div>

//         {/* Connect Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           <button
//             onClick={connectMetaMask}
//             disabled={isConnecting.metamask}
//             className="group relative overflow-hidden bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//             <div className="relative flex items-center gap-3">
//               {isConnecting.metamask ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <Plus className="w-5 h-5" />
//               )}
//               {isConnecting.metamask ? 'Connecting...' : 'Connect MetaMask'}
//             </div>
//           </button>

//           <button
//             onClick={connectMassaWallet}
//             disabled={isConnecting.massa}
//             className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//             <div className="relative flex items-center gap-3">
//               {isConnecting.massa ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <Plus className="w-5 h-5" />
//               )}
//               {isConnecting.massa ? 'Connecting...' : 'Connect Massa Wallet'}
//             </div>
//           </button>
//         </div>

//         {/* Wallet Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <WalletCard
//             title="MetaMask Wallets"
//             accounts={metaMaskAccounts}
//             type="eth"
//             color="from-orange-500 to-yellow-500"
//             icon={Wallet}
//           />
//           <WalletCard
//             title="Massa Wallets"
//             accounts={massaAccounts}
//             type="massa"
//             color="from-purple-500 to-pink-500"
//             icon={Wallet}
//           />
//         </div>

//         {/* Stats */}
//         <div className="mt-12 text-center">
//           <div className="inline-flex items-center gap-8 bg-slate-100 rounded-2xl px-8 py-4 shadow">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-slate-900">{metaMaskAccounts.length + massaAccounts.length}</div>
//               <div className="text-sm text-slate-600">Total Wallets</div>
//             </div>
//             <div className="w-px h-12 bg-slate-300"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-slate-900">{metaMaskAccounts.length}</div>
//               <div className="text-sm text-slate-600">MetaMask</div>
//             </div>
//             <div className="w-px h-12 bg-slate-300"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-slate-900">{massaAccounts.length}</div>
//               <div className="text-sm text-slate-600">Massa</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;


import React from 'react'

function page() {
  return (
    <div>
      
      payemnt
    </div>
  )
}

export default page
