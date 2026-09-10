<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  const year = new Date().getFullYear();
</script>

<footer class="bg-white border-t border-gray-100 pt-24 pb-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
      
      <!-- Brand & Description -->
      <div class="md:col-span-12 lg:col-span-5">
        <a href="/" class="flex items-center gap-4 mb-6">
          <img src={siteConfig.logo} alt={siteConfig.name} class="h-12 w-12 object-contain rounded-full shadow-sm" />
          <span class="font-bold text-2xl text-dark tracking-tight">{siteConfig.name}</span>
        </a>
        <p class="text-gray-500 max-w-sm text-lg leading-relaxed mb-8">
          Himpunan Mahasiswa Fakultas Sains dan Teknologi. Menginspirasi, berkolaborasi, dan memberikan dampak nyata.
        </p>
      </div>
      
      <!-- Navigation -->
      <div class="md:col-span-4 lg:col-span-2 lg:col-start-7">
        <h3 class="text-dark font-bold mb-6 tracking-wide">Navigation</h3>
        <ul class="space-y-4">
          <li><a href="/" class="text-gray-500 hover:text-primary transition-colors font-medium">Home</a></li>
          <li><a href="/#tentang" class="text-gray-500 hover:text-primary transition-colors font-medium">Tentang</a></li>
          <li><a href="/#divisi" class="text-gray-500 hover:text-primary transition-colors font-medium">Divisi</a></li>
          <li><a href="/#kegiatan" class="text-gray-500 hover:text-primary transition-colors font-medium">Kegiatan</a></li>
          <li><a href="/gabung-hima" class="text-gray-500 hover:text-primary transition-colors font-medium">Gabung HIMA</a></li>
        </ul>
      </div>
      
      <!-- Community -->
      <div class="md:col-span-4 lg:col-span-2">
        <h3 class="text-dark font-bold mb-6 tracking-wide">Community</h3>
        <ul class="space-y-4">
          <li><a href={siteConfig.fstGroup} target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-primary transition-colors font-medium flex items-center group">FST 2026 <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span></a></li>
          <li><a href={siteConfig.himaGroup} target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-primary transition-colors font-medium flex items-center group">HIMA FST <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span></a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="md:col-span-4 lg:col-span-2">
        <h3 class="text-dark font-bold mb-6 tracking-wide">Contact</h3>
        <ul class="space-y-4">
          <li>
            <a href={`https://wa.me/${siteConfig.adminWhatsapp}?text=${encodeURIComponent('Halo Admin HIMA FST, saya ingin mendapatkan informasi mengenai HIMA FST.')}`} 
               target="_blank" 
               rel="noopener noreferrer" 
               class="text-gray-500 hover:text-primary transition-colors font-medium flex items-center group">
               WhatsApp Admin <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </li>
        </ul>
      </div>
      
    </div>
    
    <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-gray-400 font-medium">
        &copy; {year} {siteConfig.name}. All rights reserved.
      </div>
      <div class="text-gray-400 text-sm font-medium">
        Designed with 🧡 for HIMA FST
      </div>
    </div>
  </div>
</footer>
