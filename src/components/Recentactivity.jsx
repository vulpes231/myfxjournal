import React from "react";

const Recentactivity = () => {
	return (
		<div className="overflow-auto mt-10">
			<h3 className="text-[16px] md:text-[24px] font-bold capitalize">
				recent trades
			</h3>
			<table className="text-center mt-5 min-w-full">
				<thead className="bg-slate-200 text-black capitalize">
					<tr>
						<th>s/n</th>
						<th>market</th>
						<th>position</th>
						<th className="uppercase">rr</th>
						<th>risk</th>
						<th>outcome</th>
						<th>reward</th>
					</tr>
				</thead>
				<tbody className="uppercase font-thin">
					<tr>
						<td>1.</td>
						<td>xau/usd</td>
						<td>buy</td>
						<td>1:3</td>
						<td>0.25%</td>
						<td>lost</td>
						<td>-1</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Recentactivity;
