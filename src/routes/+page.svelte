<script>
	// @ts-nocheck
	export let data;
	export let form;
	const baseurl = 'http://localhost:5173/';
</script>

<div class="bg-white dark:bg-gray-900 m-16">
	<h1
		class="mb-16 text-3xl font-bold md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center"
	>
		URL Shortener
	</h1>
	<div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
		<form method="POST" action="?/create" class="space-y-8">
			<div>
				<label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>URL</label
				>
				<input
					value={form?.url ?? ''}
					type="url"
					id="url"
					name="url"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="www.google.com"
					required
				/>
			</div>
			<div>
				<label for="key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Key word</label
				>
				<input
					value={form?.key ?? ''}
					type="text"
					id="key"
					name="key"
					class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="key"
					required
				/>
                <p class="text-red-500">{form?.message ?? ''}</p>
			</div>
			<button
				type="submit"
				class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-teal-500 sm:w-fit hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Shrink</button
			>
		</form>
	</div>

	<div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-screen-md">
		<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3"> URL </th>
					<th scope="col" class="px-6 py-3"> Short URL </th>
					<th scope="col" class="px-6 py-3"> count </th>
					<th scope="col" class="px-6 py-3"> Action </th>
				</tr>
			</thead>
			<tbody>
				{#each data.data as url}
					<tr
						class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{url.longurl}
						</th>
						<td class="px-6 py-4"> <a href={url.shorturl}>{baseurl}{url.shorturl}</a> </td>
						<td class="px-6 py-4"> {url.count} </td>
						<td class="px-6 py-4">
                            <form method="POST" action="?/delete">
                                <input type="hidden" name="id" hidden value={url.id}>
                                <button>Delete</button>
                            </form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
