import os

routes = [
    {
        "route": "mahasiswa",
        "table": "student_profiles",
        "title": "Data Mahasiswa",
        "desc": "Daftar mahasiswa yang terdaftar di portal.",
        "fields": [],
        "columns": [
            {"name": "full_name", "label": "Nama Lengkap"},
            {"name": "nim", "label": "NIM"},
            {"name": "whatsapp", "label": "WhatsApp"},
            {"name": "semester", "label": "Semester"}
        ],
        "readonly": True
    },
    {
        "route": "pendaftaran",
        "table": "membership_registrations",
        "title": "Pendaftaran Himpunan",
        "desc": "Kelola pendaftaran anggota himpunan mahasiswa baru.",
        "fields": [
            {"name": "status", "label": "Status", "type": "select", "options": ["pending", "approved", "rejected"]}
        ],
        "columns": [
            {"name": "student_id", "label": "ID Mahasiswa"},
            {"name": "division_id", "label": "ID Divisi"},
            {"name": "status", "label": "Status"}
        ],
        "readonly": True
    }
]

def generate_server_ts(route):
    table = route["table"]
    
    query = f"SELECT * FROM {table} ORDER BY id DESC"
    
    actions = ""
    if not route.get("readonly"):
        pass # Handle standard actions here if not readonly
    else:
        # Just simple delete action
        actions = f"""
export const actions: Actions = {{
	delete: async ({{ request, locals }}) => {{
		const data = await request.formData();
		const id = data.get('id');
		if (!id) return fail(400, {{ error: 'ID tidak valid' }});

		try {{
			await db.execute('DELETE FROM {table} WHERE id = ?', [id]);
			return {{ success: true }};
		}} catch (e: any) {{
			return fail(500, {{ error: e.message }});
		}}
	}}
}};
"""

    return f"""import type {{ PageServerLoad, Actions }} from './$types';
import {{ db }} from '$lib/server/db';
import {{ fail }} from '@sveltejs/kit';

export const load: PageServerLoad = async () => {{
	try {{
		const [rows] = await db.execute(`{query}`);
		return {{ items: rows as any[] }};
	}} catch (e) {{
		console.error(e);
		return {{ items: [] }};
	}}
}};
{actions}
"""

def generate_svelte(route):
    cols = route["columns"]
            
    table_headers = "".join([f'<th class="px-6 py-4 font-semibold">{c["label"]}</th>' for c in cols])
    table_cells = []
    for c in cols:
        table_cells.append(f'<td class="px-6 py-4 font-medium text-gray-900">{{item.{c["name"]}}}</td>')

    return f"""<script lang="ts">
  import {{ enhance }} from '$app/forms';
  let {{ data, form }} = $props();
</script>

<div class="mb-6">
  <h2 class="text-2xl font-bold text-gray-900">{route['title']}</h2>
  <p class="text-gray-600 text-sm mt-1">{route['desc']}</p>
</div>

{{#if form?.error}}
  <div class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{{form.error}}</div>
{{/if}}

<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50 text-gray-600 border-b border-gray-100">
        <tr>
          {table_headers}
          <th class="px-6 py-4 font-semibold text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        {{#each data.items as item}}
          <tr class="hover:bg-gray-50/50 transition-colors">
            {"".join(table_cells)}
            <td class="px-6 py-4 text-right">
              <form method="POST" action="?/delete" use:enhance class="inline">
                <input type="hidden" name="id" value={{item.id}}>
                <button type="submit" class="text-red-500 hover:text-red-700 font-medium text-sm ml-4" onclick="return confirm('Hapus data ini?')">Hapus</button>
              </form>
            </td>
          </tr>
        {{:else}}
          <tr>
            <td colspan="{len(cols) + 1}" class="px-6 py-8 text-center text-gray-500">Belum ada data.</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
</div>
"""

base_dir = "/Users/farrelnashwan/Documents/HimaFst/src/routes/(admin)/admin"

for r in routes:
    dir_path = os.path.join(base_dir, r["route"])
    server_path = os.path.join(dir_path, "+page.server.ts")
    svelte_path = os.path.join(dir_path, "+page.svelte")
    
    with open(server_path, "w") as f:
        f.write(generate_server_ts(r))
        
    with open(svelte_path, "w") as f:
        f.write(generate_svelte(r))

print("Scaffolding complete!")
