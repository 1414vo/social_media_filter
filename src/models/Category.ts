import internal from "stream";
import CategoryType from "./CategoryType";

class Category{
    category: CategoryType;
    categoryScore: number;

    constructor(category: CategoryType) {
        this.category = category;
        this.categoryScore = Category.getCategoryScore(category);
    }

    public static getCategoryScore(category: CategoryType) {
        switch(category) {
            case CategoryType.Politics:
                return 0;
            case CategoryType.Entertainment:
                return 2;
            case CategoryType.Art:
                return 1;
            case CategoryType.Music:
                return 2;
            case CategoryType.Lifestyle:
                return 1;
            case CategoryType.Academic:
                return 1;
            case CategoryType.Comedy:
                return 2;
            case CategoryType.Inspirational:
                return 2;
            case CategoryType.News:
                return 0; 
            case CategoryType.Business:
                return 0;
            case CategoryType.Tech:
                return 1;
        }
    }
}

export default Category;