import { dispatchEvent } from './gaUtils';

/**
 *
 * @param {string|Node} selector - scrollTo section selector
 * @param {Object} options - scroll options object
 * @returns
 */
export function scrollIntoView(selector, options = { behavior: 'smooth' }) {
	try {
		const node = selector instanceof Node ? selector : document.querySelector(selector);
		node.scrollIntoView(options);
	} catch (e) {
		console.warn(e.message);
	}
}

/**
 *
 * @param {Object} event - on click event
 * @returns
 */
export function scrollToSection(e) {
	e.preventDefault();
	const section = e.currentTarget.attributes?.href?.textContent;
	scrollIntoView(section);
}

/**
 *
 * @param {Object} event - on click event
 * @returns
 */
export function scrollToSectionWithGaEvent(e) {
	scrollToSection(e);
	const target = e.currentTarget;
	const section = target.getAttribute('href').replace('#', '');

	dispatchEvent('click', {
		section
	});
}
