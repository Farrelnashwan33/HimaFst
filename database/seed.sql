
-- Data for table program_studi
INSERT INTO program_studi (name) VALUES 
('Sistem Informasi UT Bandung'),
('Teknologi Pangan UT Bandung'),
('Agribisnis UT Bandung'),
('Perencanaan dan Wilayah Kota'),
('Sains dan Data UT Bandung'),
('Biologi UT Bandung'),
('Statistika UT Bandung');

-- Data for table users (Admin)
INSERT INTO users (name, email, password, role) VALUES 
('Admin HIMA FST', 'admin@himafst.local', '$2b$10$X3XJpOpFrSMF60SQd.dXmeLxPdQj7.xElI/xkYdVoulS17JsAGxo6', 'admin');

-- Data for table site_settings
INSERT INTO site_settings (setting_key, setting_value) VALUES 
('hero_badge', 'PORTAL PENGURUS'),
('hero_title', 'Dashboard Pengurus HIMA FST'),
('hero_subtitle', 'Sistem Informasi dan Manajemen Konten Portal Mahasiswa Fakultas Sains dan Teknologi.');

-- Data for table quick_access
INSERT INTO quick_access (name, url, is_active) VALUES 
('Panduan Akademik', '/akademik', 1),
('Kalender', '/kalender', 1),
('Instagram HIMA', 'https://instagram.com/himafst', 1),
('Email BEM', 'mailto:bem@himafst.local', 1);

-- Sample announcements
INSERT INTO announcements (title, content, author_id, is_published) VALUES 
('Pendaftaran Anggota Baru', 'Pendaftaran HIMA FST telah dibuka. Silakan daftar melalui portal ini.', 1, 1),
('Jadwal Kegiatan Makrab', 'Makrab akan diadakan pada bulan depan. Harap bersiap.', 1, 1);

-- Sample events
INSERT INTO events (title, description, event_date, status) VALUES 
('Webinar Teknologi', 'Seminar membahas AI', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Mendatang'),
('Rapat Rutin', 'Rapat koordinasi mingguan', DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'Mendatang');

-- Sample achievements
INSERT INTO achievements (student_name, award_name, award_date, image_url, description) VALUES 
('Lutfi Ardiansyah', 'DISPORSENI Nasional UT 2026', '2026-07-01', '/prestasi/lutfi.png', 'S1 Sistem Informasi'),
('Wasil Mawardi Assul Toni', 'DISPORSENI Nasional UT 2026', '2026-07-01', '/prestasi/wasil.png', 'S1 Sistem Informasi'),
('Alfi Tahar', 'DISPORSENI Nasional UT 2026', '2026-07-01', '/prestasi/alfi.png', 'S1 Sains & Data');

