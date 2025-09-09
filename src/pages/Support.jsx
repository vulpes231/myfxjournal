import React, { useState } from "react";

const faqs = [
	{
		question: "How do I reset my password?",
		answer:
			"Go to your Profile page, use the Reset Password section, and follow the instructions.",
	},
	{
		question: "Can I export my journal?",
		answer:
			"Yes, you can export your trades as CSV or PDF from the Journal Settings page.",
	},
	{
		question: "How do I change my default trading pair?",
		answer:
			"Visit Profile → Journal Settings and select your preferred default pair.",
	},
];

const Support = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 bg-gray-50 dark:bg-slate-950">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
						Support Center
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Need help with ChronoTrade? Check our FAQ or reach out to us
						directly.
					</p>
				</div>

				{/* FAQ Section */}
				<div className="mb-12">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
						Frequently Asked Questions
					</h2>
					<div className="space-y-3">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="bg-white dark:bg-slate-900 shadow rounded-lg overflow-hidden"
							>
								<button
									className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 dark:text-gray-200 font-medium"
									onClick={() => toggleFAQ(index)}
								>
									<span>{faq.question}</span>
									<span>{openIndex === index ? "−" : "+"}</span>
								</button>
								{openIndex === index && (
									<div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
										{faq.answer}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Contact Form */}
				<div className="bg-white dark:bg-slate-900 shadow rounded-lg p-6 mb-12">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
						Contact Us
					</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							alert("Message submitted! (hook this up to backend)");
						}}
						className="flex flex-col gap-4"
					>
						<div>
							<label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
								Name
							</label>
							<input
								type="text"
								required
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1FA9D2]"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
								Email
							</label>
							<input
								type="email"
								required
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1FA9D2]"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
								Message
							</label>
							<textarea
								required
								rows="4"
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1FA9D2]"
							></textarea>
						</div>
						<button
							type="submit"
							className="bg-[#1FA9D2] hover:bg-[#1784a5] text-white rounded-lg px-4 py-2 text-sm font-medium transition"
						>
							Send Message
						</button>
					</form>
				</div>

				{/* Contact Info */}
				<div className="text-center text-gray-600 dark:text-gray-400">
					<p>
						📧 Email us:{" "}
						<a
							href="mailto:support@chronotrade.com"
							className="text-[#1FA9D2] font-medium"
						>
							support@chronotrade.com
						</a>
					</p>
					<p className="mt-1">
						⏰ Support hours: Mon - Fri, 9:00 AM - 6:00 PM (UTC)
					</p>
				</div>
			</div>
		</section>
	);
};

export default Support;
