import grass1 from '$lib/images/tile/grass-1.png';
import grass2 from '$lib/images/tile/grass-2.png';
import water1 from '$lib/images/tile/water-1.png';
import water2 from '$lib/images/tile/water-2.png';
import sand1 from '$lib/images/tile/sand-1.png';
import sand2 from '$lib/images/tile/sand-2.png';
import dirt1 from '$lib/images/tile/dirt-1.png';
import dirt2 from '$lib/images/tile/dirt-2.png';
import forest1 from '$lib/images/tile/forest-1.png';
import forest2 from '$lib/images/tile/forest-2.png';
import forest3 from '$lib/images/tile/forest-3.png';
import forest4 from '$lib/images/tile/forest-4.png';

import farm1 from '$lib/images/structure/farm-1.png';
import farm2 from '$lib/images/structure/farm-2.png';
import house1 from '$lib/images/structure/house1.png';
import house2 from '$lib/images/structure/house2.png';
import stable from '$lib/images/structure/stable.png';
import blacksmith from '$lib/images/structure/blacksmith.png';
import lumbercamp from '$lib/images/structure/lumbercamp.png';
import chapel from '$lib/images/structure/chapel.png';
import mine from '$lib/images/structure/mine.png';

interface Land {
	type: string;
	image: string;
}

interface Building {
	type: string;
	image: string;
}

export interface Tile {
	id: number;
	land: Land;
	building: Building;
}

export interface Tool {
	type: string;
	images: string[];
}

export const MAP_WIDTH = 30;

export const GAME_OBJECTS = {
	land: {
		grass: {
			type: 'grass',
			images: [grass1, grass2]
		},
		water: {
			type: 'water',
			images: [water1, water2]
		},
		sand: {
			type: 'sand',
			images: [sand1, sand2]
		},
		dirt: {
			type: 'dirt',
			images: [dirt1, dirt2]
		},
		forest: {
			type: 'forest',
			images: [forest1, forest2, forest3, forest4]
		}
	},
	building: {
		house: {
			type: 'house',
			images: [house1, house2],
			stats: {
				population: 3,
				cost: {
					wood: 50,
					food: 150
				}
			}
		},
		farm: {
			type: 'farm',
			images: [farm1, farm2],
			stats: {
				collectionRate: {
					food: 3
				},
				cost: {
					wood: 200
				}
			}
		},
		lumbercamp: {
			type: 'lumbercamp',
			images: [lumbercamp],
			stats: {
				collectionRate: {
					wood: 0
				},
				cost: {
					wood: 200
				}
			}
		},
		mine: {
			type: 'mine',
			images: [mine],
			stats: {
				collectionRate: {
					stone: 3
				},
				cost: {
					wood: 200
				}
			}
		},
		stable: {
			type: 'stable',
			images: [stable],
			stats: {
				cost: {
					wood: 500
				}
			}
		},
		blacksmith: {
			type: 'blacksmith',
			images: [blacksmith],
			stats: {
				cost: {
					wood: 500,
					stone: 200
				}
			}
		},
		chapel: {
			type: 'chapel',
			images: [chapel],
			stats: {
				cost: {
					wood: 300,
					stone: 200
				}
			}
		}
	},
	tool: {
		delete: {
			type: 'delete',
			images: []
		}
	}
};

// Here's why this structure is nice:
const grassImages = GAME_OBJECTS.land.grass.images;
