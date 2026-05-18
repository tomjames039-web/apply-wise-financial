export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  categorySlug: string;
  lastUpdated: string;
  content: GuideSection[];
  keyPoints?: string[];
  relatedGuides?: string[];
}

export interface GuideSection {
  heading?: string;
  content: string;
  type?: "text" | "list" | "tip" | "warning" | "example";
  items?: string[];
}

export const guidesData: Record<string, GuideArticle> = {
  // FIRST TIME BUYERS
  "first-time-buyers/complete-first-home-guide": {
    slug: "complete-first-home-guide",
    title: "Complete Guide to Buying Your First Home",
    description: "Everything you need to know from saving your deposit to picking up the keys.",
    readTime: "15 min read",
    category: "First Time Buyers",
    categorySlug: "first-time-buyers",
    lastUpdated: "March 2024",
    keyPoints: [
      "You typically need a 5-10% deposit minimum",
      "Get a Mortgage in Principle before house hunting",
      "First time buyers pay no stamp duty up to £425,000",
      "Budget for additional costs: solicitor fees, surveys, moving costs"
    ],
    content: [
      {
        heading: "Introduction",
        content: "Buying your first home is one of the biggest financial decisions you'll ever make. This comprehensive guide walks you through every step of the process, from saving your deposit to collecting the keys to your new home.",
        type: "text"
      },
      {
        heading: "Step 1: Check Your Finances",
        content: "Before you start browsing Rightmove, you need to understand your financial position. Lenders will look at your income, outgoings, credit history, and existing debts to determine how much they'll lend you.",
        type: "text"
      },
      {
        type: "list",
        content: "Key financial checks to make:",
        items: [
          "Check your credit report with all three agencies (Experian, Equifax, TransUnion)",
          "Calculate your monthly income after tax",
          "List all your regular outgoings and debts",
          "Review your bank statements - lenders will ask for 3 months",
          "Make sure you're on the electoral roll at your current address"
        ]
      },
      {
        heading: "Step 2: Save for Your Deposit",
        content: "Most lenders require a minimum deposit of 5% of the property value, though 10% or more will get you access to better interest rates. For a £250,000 property, that means saving at least £12,500.",
        type: "text"
      },
      {
        type: "tip",
        content: "A Lifetime ISA lets you save up to £4,000 per year and the government adds a 25% bonus (up to £1,000 per year). You must be between 18-39 to open one, and the money must be used for your first home."
      },
      {
        heading: "Step 3: Get a Mortgage in Principle",
        content: "A Mortgage in Principle (also called an Agreement in Principle or Decision in Principle) is a certificate from a lender showing how much they're willing to lend you in theory. This isn't a guarantee, but it shows estate agents and sellers that you're a serious buyer.",
        type: "text"
      },
      {
        type: "text",
        content: "Most MIPs are valid for 60-90 days and involve a soft credit check that won't affect your credit score. We can help you get an MIP usually within 24 hours."
      },
      {
        heading: "Step 4: Find Your Property",
        content: "Now comes the exciting part - house hunting! Use property websites like Rightmove, Zoopla, and OnTheMarket. Register with local estate agents and let them know your requirements and budget.",
        type: "text"
      },
      {
        type: "list",
        content: "Things to consider when viewing properties:",
        items: [
          "Location - transport links, schools, amenities",
          "Condition - will you need to do work immediately?",
          "Size - enough space for your needs now and in the future",
          "Outside space - garden, parking",
          "Potential issues - damp, cracks, roof condition"
        ]
      },
      {
        heading: "Step 5: Make an Offer",
        content: "Once you've found a property you love, it's time to make an offer through the estate agent. Your offer can be lower than the asking price - the agent is legally obliged to pass on all offers to the seller.",
        type: "text"
      },
      {
        type: "tip",
        content: "Being chain-free (you're not waiting to sell another property) and having an MIP makes you a more attractive buyer. Use this as leverage when negotiating!"
      },
      {
        heading: "Step 6: Apply for Your Mortgage",
        content: "Once your offer is accepted, it's time to submit your full mortgage application. This is where we come in - as whole-of-market brokers, we'll compare deals from over 90 lenders to find you the best rate.",
        type: "text"
      },
      {
        type: "list",
        content: "Documents you'll typically need:",
        items: [
          "Proof of ID (passport or driving licence)",
          "Proof of address (utility bills, bank statements)",
          "Last 3 months' payslips",
          "Last 3 months' bank statements",
          "P60 from your employer",
          "Proof of deposit"
        ]
      },
      {
        heading: "Step 7: Surveys and Valuations",
        content: "The lender will arrange a valuation to confirm the property is worth what you're paying. You should also consider getting your own survey to identify any issues with the property.",
        type: "text"
      },
      {
        type: "list",
        content: "Types of surveys available:",
        items: [
          "Mortgage Valuation - basic check for the lender (often free)",
          "HomeBuyer Report - mid-level survey, good for modern properties",
          "Building Survey - comprehensive survey, recommended for older properties"
        ]
      },
      {
        heading: "Step 8: Conveyancing",
        content: "You'll need a solicitor or licensed conveyancer to handle the legal side of buying your home. They'll conduct searches, review contracts, and handle the transfer of funds.",
        type: "text"
      },
      {
        type: "warning",
        content: "Conveyancing typically takes 8-12 weeks, though it can be longer. Don't book removals or give notice on your rental until exchange of contracts!"
      },
      {
        heading: "Step 9: Exchange and Completion",
        content: "Exchange of contracts is when the purchase becomes legally binding. You'll pay your deposit (usually 10% of the purchase price) and set a completion date, typically 1-2 weeks later.",
        type: "text"
      },
      {
        type: "text",
        content: "On completion day, the remaining funds are transferred, the property officially becomes yours, and you can collect the keys. Congratulations - you're a homeowner!"
      },
      {
        heading: "Costs to Budget For",
        content: "Beyond your deposit, there are several other costs to budget for when buying your first home.",
        type: "text"
      },
      {
        type: "list",
        content: "Additional costs to consider:",
        items: [
          "Stamp Duty - free up to £425,000 for first time buyers",
          "Solicitor fees - typically £1,000-£1,500",
          "Survey costs - £250-£600 depending on type",
          "Mortgage fees - some products have arrangement fees",
          "Removal costs - £300-£1,500 depending on distance and volume",
          "Furniture and decorating - budget varies!"
        ]
      }
    ],
    relatedGuides: [
      "first-time-buyers/deposit-requirements",
      "first-time-buyers/stamp-duty-first-time-buyers",
      "first-time-buyers/first-time-buyer-schemes"
    ]
  },

  "first-time-buyers/deposit-requirements": {
    slug: "deposit-requirements",
    title: "How Much Deposit Do You Need?",
    description: "Understanding deposit requirements and how to maximise your options.",
    readTime: "5 min read",
    category: "First Time Buyers",
    categorySlug: "first-time-buyers",
    lastUpdated: "March 2024",
    keyPoints: [
      "Minimum deposit is typically 5% of the property value",
      "10% deposit unlocks better interest rates",
      "25%+ deposit gives access to the best rates",
      "Gifted deposits from family are accepted by most lenders"
    ],
    content: [
      {
        heading: "Understanding Deposit Requirements",
        content: "The deposit is the amount of money you put towards buying your home upfront. The rest is covered by your mortgage. The size of your deposit affects which mortgage deals you can access and what interest rate you'll pay.",
        type: "text"
      },
      {
        heading: "Minimum Deposit Requirements",
        content: "Most lenders require a minimum deposit of 5% of the property value. For a £250,000 property, that's £12,500. However, 5% deposit mortgages typically come with higher interest rates.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: On a £250,000 property, a 5% deposit (£12,500) might get you a rate of 5.5%, while a 10% deposit (£25,000) could reduce this to 4.8%, and 25% (£62,500) might get you 4.2%."
      },
      {
        heading: "How Your Deposit Affects Your Rate",
        content: "Lenders use Loan-to-Value (LTV) ratios to price their mortgages. LTV is the mortgage amount as a percentage of the property value. A 10% deposit means 90% LTV.",
        type: "text"
      },
      {
        type: "list",
        content: "Typical LTV bands and what they mean:",
        items: [
          "95% LTV (5% deposit) - Highest rates, limited lender choice",
          "90% LTV (10% deposit) - Better rates, more options",
          "85% LTV (15% deposit) - Good rates available",
          "75% LTV (25% deposit) - Access to best rates",
          "60% LTV (40% deposit) - Very competitive rates"
        ]
      },
      {
        heading: "Gifted Deposits",
        content: "Can't save enough yourself? Many first-time buyers receive help from family. A gifted deposit is money given to you by a family member (usually parents or grandparents) with no expectation of repayment.",
        type: "text"
      },
      {
        type: "text",
        content: "Most lenders accept gifted deposits but will need a letter from the gift-giver confirming it's a gift (not a loan) and that they have no interest in the property."
      },
      {
        heading: "Saving for Your Deposit",
        content: "Building up your deposit takes time and discipline. Here are some strategies that can help.",
        type: "text"
      },
      {
        type: "list",
        content: "Ways to save faster:",
        items: [
          "Open a Lifetime ISA for the 25% government bonus",
          "Set up a standing order on payday - pay yourself first",
          "Cut unnecessary subscriptions and expenses",
          "Consider moving back home temporarily to save on rent",
          "Look into shared ownership if saving a full deposit is difficult"
        ]
      },
      {
        type: "tip",
        content: "Even an extra 5% deposit can make a significant difference to your mortgage rate. It's often worth delaying your purchase by a few months to save more if you're close to the next LTV band."
      }
    ],
    relatedGuides: [
      "first-time-buyers/complete-first-home-guide",
      "first-time-buyers/first-time-buyer-schemes"
    ]
  },

  "first-time-buyers/stamp-duty-first-time-buyers": {
    slug: "stamp-duty-first-time-buyers",
    title: "Understanding Stamp Duty for First Time Buyers",
    description: "First time buyer stamp duty relief and how to calculate what you'll pay.",
    readTime: "6 min read",
    category: "First Time Buyers",
    categorySlug: "first-time-buyers",
    lastUpdated: "March 2024",
    keyPoints: [
      "No stamp duty on properties up to £425,000 for first time buyers",
      "5% stamp duty on the portion between £425,001 and £625,000",
      "No relief if property costs more than £625,000",
      "You must be buying your only home"
    ],
    content: [
      {
        heading: "What is Stamp Duty?",
        content: "Stamp Duty Land Tax (SDLT) is a tax you pay when buying property in England and Northern Ireland. Scotland has LBTT (Land and Buildings Transaction Tax) and Wales has LTT (Land Transaction Tax) with different rates.",
        type: "text"
      },
      {
        heading: "First Time Buyer Relief",
        content: "First time buyers benefit from stamp duty relief, meaning you pay less (or nothing) compared to other buyers. This can save you thousands of pounds.",
        type: "text"
      },
      {
        type: "list",
        content: "Current first time buyer stamp duty rates:",
        items: [
          "£0 - £425,000: 0% (no stamp duty)",
          "£425,001 - £625,000: 5% on the amount above £425,000",
          "Above £625,000: Standard rates apply (no first time buyer relief)"
        ]
      },
      {
        type: "example",
        content: "Example: Buying a £500,000 property as a first time buyer. You pay 0% on the first £425,000 and 5% on the remaining £75,000 = £3,750 stamp duty. A non-first time buyer would pay £12,500."
      },
      {
        heading: "Who Qualifies as a First Time Buyer?",
        content: "To qualify for first time buyer relief, you must never have owned a property anywhere in the world. This applies to all buyers if purchasing jointly.",
        type: "text"
      },
      {
        type: "warning",
        content: "If you're buying with someone who has owned property before (even if they've sold it), you won't qualify for first time buyer relief. The standard rates will apply to the whole purchase."
      },
      {
        heading: "When Do You Pay?",
        content: "Stamp duty is due within 14 days of completion. Your solicitor will usually handle this for you, collecting the money as part of the completion process.",
        type: "text"
      },
      {
        heading: "Standard Rates for Comparison",
        content: "If you don't qualify for first time buyer relief, or your property is over £625,000, standard rates apply.",
        type: "text"
      },
      {
        type: "list",
        content: "Standard stamp duty rates:",
        items: [
          "£0 - £250,000: 0%",
          "£250,001 - £925,000: 5%",
          "£925,001 - £1,500,000: 10%",
          "Above £1,500,000: 12%"
        ]
      }
    ],
    relatedGuides: [
      "first-time-buyers/complete-first-home-guide",
      "first-time-buyers/deposit-requirements"
    ]
  },

  "first-time-buyers/first-time-buyer-schemes": {
    slug: "first-time-buyer-schemes",
    title: "First Time Buyer Schemes Explained",
    description: "Shared Ownership, Help to Buy, and other schemes to help you get on the ladder.",
    readTime: "8 min read",
    category: "First Time Buyers",
    categorySlug: "first-time-buyers",
    lastUpdated: "March 2024",
    keyPoints: [
      "Shared Ownership lets you buy a share (25-75%) and pay rent on the rest",
      "First Homes offers 30-50% discount on new builds",
      "Lifetime ISA gives 25% bonus on savings up to £4,000/year",
      "Some local councils offer additional schemes"
    ],
    content: [
      {
        heading: "Introduction to First Time Buyer Schemes",
        content: "Getting on the property ladder can feel impossible, especially in expensive areas. Several government-backed schemes exist to help first time buyers purchase their first home with a smaller deposit or at a reduced price.",
        type: "text"
      },
      {
        heading: "Shared Ownership",
        content: "Shared Ownership lets you buy a share of a property (between 25% and 75%) and pay rent on the remaining share. You can increase your share over time through a process called 'staircasing'.",
        type: "text"
      },
      {
        type: "list",
        content: "Shared Ownership key points:",
        items: [
          "Buy a share of 25-75% of the property",
          "Pay subsidised rent on the share you don't own",
          "Only need a deposit on the share you're buying (e.g., 5% of your 25% share)",
          "Available on new builds and resales through housing associations",
          "Household income must be £80,000 or less (£90,000 in London)"
        ]
      },
      {
        type: "example",
        content: "Example: A property worth £300,000. You buy a 25% share (£75,000) with a 5% deposit (£3,750). You get a mortgage for £71,250 and pay rent on the other 75%."
      },
      {
        heading: "First Homes Scheme",
        content: "First Homes is a government scheme offering new build homes at a discount of at least 30% (up to 50% in some areas) compared to market value. The discount remains with the property for future sales.",
        type: "text"
      },
      {
        type: "list",
        content: "First Homes eligibility:",
        items: [
          "Must be a first time buyer",
          "Household income under £80,000 (£90,000 in London)",
          "Must get a mortgage for at least 50% of the discounted price",
          "Property must be your only home",
          "Local connection requirements may apply"
        ]
      },
      {
        heading: "Lifetime ISA",
        content: "The Lifetime ISA isn't a home-buying scheme per se, but it's a tax-efficient way to save for your first home. The government adds a 25% bonus to your savings.",
        type: "text"
      },
      {
        type: "list",
        content: "Lifetime ISA details:",
        items: [
          "Save up to £4,000 per year",
          "Government adds 25% bonus (up to £1,000 per year)",
          "Must be aged 18-39 to open one",
          "Property must cost £450,000 or less",
          "Must have been open for at least 12 months before using"
        ]
      },
      {
        type: "tip",
        content: "Open a Lifetime ISA as soon as you can, even if you only put £1 in. The 12-month clock starts from when you open it, not when you start saving seriously."
      },
      {
        heading: "Deposit Unlock",
        content: "Some housebuilders offer Deposit Unlock on new build properties, allowing you to buy with just a 5% deposit while accessing rates normally reserved for 15% deposits.",
        type: "text"
      },
      {
        heading: "Which Scheme is Right for You?",
        content: "The best scheme depends on your circumstances. Shared Ownership is good if you want to live in an expensive area but can't afford a full purchase. First Homes offers great value but limited availability. The Lifetime ISA helps anyone saving for a first home.",
        type: "text"
      }
    ],
    relatedGuides: [
      "first-time-buyers/complete-first-home-guide",
      "first-time-buyers/deposit-requirements"
    ]
  },

  // REMORTGAGING
  "remortgaging/when-to-remortgage": {
    slug: "when-to-remortgage",
    title: "When Should You Remortgage?",
    description: "Signs it's time to switch and how to avoid costly SVR rates.",
    readTime: "7 min read",
    category: "Remortgaging",
    categorySlug: "remortgaging",
    lastUpdated: "March 2024",
    keyPoints: [
      "Start looking 6 months before your deal ends",
      "SVR rates can be 2-3% higher than fixed rates",
      "You can lock in a rate up to 6 months early",
      "Free remortgage service with Apply Wise"
    ],
    content: [
      {
        heading: "Why Remortgage?",
        content: "Remortgaging means switching your mortgage to a new deal, either with your current lender (product transfer) or a different lender. Most people remortgage to get a better interest rate and reduce their monthly payments.",
        type: "text"
      },
      {
        heading: "When Your Fixed Rate Ends",
        content: "The most common reason to remortgage is when your fixed rate deal ends. If you don't take action, you'll be moved onto your lender's Standard Variable Rate (SVR), which is almost always higher.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: If your fixed rate is 4% and your lender's SVR is 7%, on a £200,000 mortgage you'd pay an extra £350 per month by not remortgaging. That's £4,200 per year wasted!"
      },
      {
        heading: "Start Early - 6 Months Before",
        content: "Most lenders allow you to apply for a new mortgage up to 6 months before your current deal ends. This lets you lock in a good rate early while still benefiting from your current deal until it expires.",
        type: "text"
      },
      {
        type: "tip",
        content: "Mark your calendar 6 months before your deal ends. Set a reminder so you don't forget - it's the most expensive mistake homeowners make!"
      },
      {
        heading: "Other Reasons to Remortgage",
        content: "There are several other situations where remortgaging makes sense.",
        type: "text"
      },
      {
        type: "list",
        content: "Consider remortgaging if:",
        items: [
          "Your property has increased in value (lower LTV = better rates)",
          "Your credit score has improved significantly",
          "You want to release equity for home improvements",
          "You want to consolidate debts",
          "Your circumstances have changed (income increased, etc.)",
          "Interest rates have dropped since you got your mortgage"
        ]
      },
      {
        heading: "Early Repayment Charges",
        content: "If you're still within your fixed rate period, you may face Early Repayment Charges (ERCs) for leaving early. These can be 1-5% of your mortgage balance, so you need to calculate whether switching still makes financial sense.",
        type: "text"
      },
      {
        type: "warning",
        content: "Don't assume you're stuck until your deal ends. Sometimes paying an ERC is still cheaper than staying on a high rate. We can calculate this for you."
      },
      {
        heading: "Product Transfer vs Remortgage",
        content: "A product transfer is when you switch to a new deal with your existing lender. It's usually quicker and involves less paperwork, but you might get a better rate by switching to a different lender. We check both options for you.",
        type: "text"
      }
    ],
    relatedGuides: [
      "remortgaging/how-to-remortgage",
      "remortgaging/product-transfer-vs-remortgage"
    ]
  },

  "remortgaging/how-to-remortgage": {
    slug: "how-to-remortgage",
    title: "How to Remortgage: Step by Step Guide",
    description: "The complete process from application to completion.",
    readTime: "12 min read",
    category: "Remortgaging",
    categorySlug: "remortgaging",
    lastUpdated: "March 2024",
    keyPoints: [
      "Process typically takes 4-8 weeks",
      "You'll need similar documents to your original mortgage",
      "Legal work is often handled free by the new lender",
      "No stamp duty to pay when remortgaging"
    ],
    content: [
      {
        heading: "Overview of the Remortgage Process",
        content: "Remortgaging is generally simpler than getting your first mortgage. You're not buying a new property, so there's no chain to worry about and the legal work is more straightforward.",
        type: "text"
      },
      {
        heading: "Step 1: Review Your Current Situation",
        content: "Before you start, gather information about your current mortgage: remaining balance, current rate, when your deal ends, and any early repayment charges. Check your latest mortgage statement or log into your lender's online portal.",
        type: "text"
      },
      {
        heading: "Step 2: Get an Idea of Your Property Value",
        content: "Your Loan-to-Value (LTV) ratio affects which rates you can access. Check recent sales of similar properties on Rightmove or Zoopla to estimate your home's current value.",
        type: "text"
      },
      {
        type: "tip",
        content: "If your property has increased in value since you bought it, you might now be in a lower LTV band, unlocking better rates. A £200,000 mortgage on a property worth £300,000 is 67% LTV - much better than the 90% LTV you might have started with!"
      },
      {
        heading: "Step 3: Compare Deals",
        content: "This is where we come in. As whole-of-market mortgage brokers, we compare rates from over 90 lenders, including your current lender's product transfer options. We'll find the best deal for your situation.",
        type: "text"
      },
      {
        heading: "Step 4: Apply for Your New Mortgage",
        content: "Once you've chosen a deal, you'll need to complete a full mortgage application. This involves providing documents to prove your identity, income, and outgoings.",
        type: "text"
      },
      {
        type: "list",
        content: "Documents typically required:",
        items: [
          "Proof of ID (passport or driving licence)",
          "Proof of address (utility bill, bank statement)",
          "Last 3 months' payslips (or 2-3 years' accounts if self-employed)",
          "Last 3 months' bank statements",
          "Latest mortgage statement"
        ]
      },
      {
        heading: "Step 5: Property Valuation",
        content: "The new lender will value your property to confirm it's worth what you say. This is often done as a desktop valuation (using data rather than a physical visit) and is usually free.",
        type: "text"
      },
      {
        heading: "Step 6: Mortgage Offer",
        content: "Once the lender is happy with your application and valuation, they'll issue a formal mortgage offer. This usually takes 2-4 weeks from application.",
        type: "text"
      },
      {
        heading: "Step 7: Legal Work",
        content: "A solicitor handles the legal transfer from your old lender to your new one. Many remortgage deals include free legal work, so you won't need to pay for this.",
        type: "text"
      },
      {
        heading: "Step 8: Completion",
        content: "On completion day, your new lender pays off your old mortgage and your new deal begins. This is timed to coincide with your old deal ending to avoid any gaps or overlaps.",
        type: "text"
      },
      {
        type: "text",
        content: "The whole process typically takes 4-8 weeks, though it can be quicker if there are no complications."
      }
    ],
    relatedGuides: [
      "remortgaging/when-to-remortgage",
      "remortgaging/remortgage-release-equity"
    ]
  },

  "remortgaging/remortgage-release-equity": {
    slug: "remortgage-release-equity",
    title: "Remortgaging to Release Equity",
    description: "How to access your home's value for improvements or other purposes.",
    readTime: "6 min read",
    category: "Remortgaging",
    categorySlug: "remortgaging",
    lastUpdated: "March 2024",
    keyPoints: [
      "Equity is the difference between your property value and mortgage balance",
      "You can borrow against this equity when remortgaging",
      "Common uses: home improvements, debt consolidation, helping children buy",
      "You'll need sufficient income to afford the higher borrowing"
    ],
    content: [
      {
        heading: "What is Equity Release Through Remortgaging?",
        content: "When you remortgage to release equity, you're borrowing more than your current mortgage balance, taking the difference as cash. This is different from lifetime mortgages (also called equity release) which are designed for over-55s.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: Your home is worth £350,000 and you owe £150,000. You have £200,000 in equity. You could remortgage to £200,000 and take £50,000 as cash, while still having 43% LTV."
      },
      {
        heading: "Common Reasons for Releasing Equity",
        content: "People release equity for many reasons, but some purposes are more acceptable to lenders than others.",
        type: "text"
      },
      {
        type: "list",
        content: "Common uses for released equity:",
        items: [
          "Home improvements and extensions",
          "Debt consolidation",
          "Helping children with deposits",
          "Buying a second property or holiday home",
          "Large purchases (car, wedding, etc.)",
          "Business investment"
        ]
      },
      {
        type: "warning",
        content: "Be cautious about debt consolidation. While it can reduce your monthly payments, you'll be paying interest over a much longer period. Short-term debt becomes long-term debt secured against your home."
      },
      {
        heading: "How Much Can You Release?",
        content: "The amount you can release depends on your property value, current mortgage, income, and credit history. Most lenders won't go above 85-90% LTV, and you'll need to pass affordability checks for the higher borrowing.",
        type: "text"
      },
      {
        heading: "Costs to Consider",
        content: "Releasing equity isn't free money - you'll pay interest on the additional borrowing for the life of the mortgage. Make sure you've calculated the total cost before proceeding.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: Borrowing an extra £50,000 at 5% over 20 years would cost you around £79,000 in total (£50,000 capital + £29,000 interest). That home improvement needs to be worth it!"
      }
    ],
    relatedGuides: [
      "remortgaging/when-to-remortgage",
      "remortgaging/how-to-remortgage"
    ]
  },

  "remortgaging/product-transfer-vs-remortgage": {
    slug: "product-transfer-vs-remortgage",
    title: "Product Transfer vs Remortgage",
    description: "Which option is right for you when your deal ends?",
    readTime: "5 min read",
    category: "Remortgaging",
    categorySlug: "remortgaging",
    lastUpdated: "March 2024",
    keyPoints: [
      "Product transfer = new deal with same lender",
      "Remortgage = switch to a different lender",
      "Product transfers are quicker and simpler",
      "Remortgaging might get you a better rate"
    ],
    content: [
      {
        heading: "What's the Difference?",
        content: "A product transfer means switching to a new rate with your current lender. A remortgage means moving your mortgage to a different lender entirely. Both achieve the same goal - getting you a new deal before you fall onto the SVR.",
        type: "text"
      },
      {
        heading: "Product Transfer Advantages",
        content: "Product transfers are quick, simple, and often involve minimal paperwork. Your current lender already knows you, so they don't need to reassess everything from scratch.",
        type: "text"
      },
      {
        type: "list",
        content: "Benefits of product transfers:",
        items: [
          "Usually no affordability assessment required",
          "Minimal paperwork",
          "No legal fees or valuation needed",
          "Can be done in days rather than weeks",
          "Good option if your circumstances have changed for the worse"
        ]
      },
      {
        heading: "Remortgage Advantages",
        content: "Switching to a new lender opens up the whole market. You might find a significantly better rate, especially if your LTV has improved or if other lenders are being more competitive.",
        type: "text"
      },
      {
        type: "list",
        content: "Benefits of remortgaging:",
        items: [
          "Access to rates from 90+ lenders",
          "May find a much better rate",
          "Opportunity to borrow more (release equity)",
          "Free legal work often included",
          "Free valuation usually included"
        ]
      },
      {
        heading: "Which Should You Choose?",
        content: "It depends on your situation. If your circumstances have changed significantly (income dropped, credit issues), a product transfer might be your best or only option. If your situation has improved and you want the best possible rate, remortgaging is worth exploring.",
        type: "text"
      },
      {
        type: "tip",
        content: "You don't have to choose one or the other initially. We'll compare your current lender's product transfer rates against the whole market and tell you which option saves you the most money."
      }
    ],
    relatedGuides: [
      "remortgaging/when-to-remortgage",
      "remortgaging/how-to-remortgage"
    ]
  },

  // BUY TO LET
  "buy-to-let/getting-started-landlord": {
    slug: "getting-started-landlord",
    title: "Getting Started as a Landlord",
    description: "Everything you need to know before buying your first investment property.",
    readTime: "15 min read",
    category: "Buy To Let",
    categorySlug: "buy-to-let",
    lastUpdated: "March 2024",
    keyPoints: [
      "Buy-to-let requires minimum 25% deposit usually",
      "Rental income must typically cover 125-145% of mortgage payments",
      "You'll pay 3% stamp duty surcharge on top of standard rates",
      "Consider limited company ownership for tax efficiency"
    ],
    content: [
      {
        heading: "Is Buy-to-Let Right for You?",
        content: "Being a landlord can be rewarding, but it's not passive income. You'll need to manage the property, deal with tenants, handle maintenance, and navigate changing regulations. Make sure you understand what you're getting into.",
        type: "text"
      },
      {
        heading: "Financial Requirements",
        content: "Buy-to-let mortgages have stricter requirements than residential mortgages. You'll need a larger deposit and must meet rental coverage requirements.",
        type: "text"
      },
      {
        type: "list",
        content: "Typical BTL mortgage requirements:",
        items: [
          "Minimum 25% deposit (some lenders accept 20%)",
          "Rental income must cover 125-145% of mortgage payment",
          "Minimum personal income of £25,000+ (some lenders)",
          "Good credit history",
          "Some lenders require you to own your own home first"
        ]
      },
      {
        heading: "Stamp Duty Surcharge",
        content: "When buying an additional property (including BTL), you'll pay a 3% surcharge on top of standard stamp duty rates. This applies from the first pound.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: Buying a £250,000 BTL property. Standard stamp duty would be £0 (up to £250k threshold). But with the 3% surcharge, you'll pay £7,500 (3% of £250,000)."
      },
      {
        heading: "Personal Name vs Limited Company",
        content: "You can buy BTL property in your personal name or through a limited company (SPV). The right choice depends on your tax situation.",
        type: "text"
      },
      {
        type: "list",
        content: "Considerations for company ownership:",
        items: [
          "Mortgage interest is fully deductible for companies (not for personal ownership)",
          "Corporation tax (25%) may be lower than your income tax rate",
          "More complex accounting and admin",
          "Better for building a portfolio long-term",
          "Not as beneficial for basic rate taxpayers"
        ]
      },
      {
        heading: "Choosing the Right Property",
        content: "The best rental properties aren't necessarily the ones you'd want to live in. Focus on what tenants want: good transport links, local amenities, and reasonable rent for the area.",
        type: "text"
      },
      {
        type: "tip",
        content: "Research rental demand and typical rents before buying. A cheap property is worthless if you can't find tenants. Speak to local letting agents about demand in different areas."
      },
      {
        heading: "Landlord Responsibilities",
        content: "As a landlord, you have legal obligations to your tenants including safety checks, deposit protection, and providing certain documents.",
        type: "text"
      },
      {
        type: "list",
        content: "Key landlord responsibilities:",
        items: [
          "Annual gas safety check (if property has gas)",
          "Electrical safety check every 5 years",
          "Working smoke and CO alarms",
          "Protect deposit in government-backed scheme",
          "Provide EPC, gas safety certificate, and How to Rent guide",
          "Maintain the property in good condition"
        ]
      }
    ],
    relatedGuides: [
      "buy-to-let/btl-tax-guide",
      "buy-to-let/limited-company-btl"
    ]
  },

  "buy-to-let/btl-tax-guide": {
    slug: "btl-tax-guide",
    title: "Buy To Let Tax Guide",
    description: "Stamp duty surcharges, income tax, and tax-efficient ownership structures.",
    readTime: "10 min read",
    category: "Buy To Let",
    categorySlug: "buy-to-let",
    lastUpdated: "March 2024",
    keyPoints: [
      "Rental income is taxed as income at your marginal rate",
      "Mortgage interest relief is now limited to basic rate (20%)",
      "3% stamp duty surcharge on additional properties",
      "Capital gains tax applies when you sell"
    ],
    content: [
      {
        heading: "Income Tax on Rental Income",
        content: "Rental income is added to your other income and taxed at your marginal rate. If you're a higher-rate taxpayer, you'll pay 40% tax on your rental profits.",
        type: "text"
      },
      {
        heading: "Allowable Expenses",
        content: "You can deduct certain costs from your rental income before calculating tax. This reduces your taxable profit.",
        type: "text"
      },
      {
        type: "list",
        content: "Tax-deductible expenses include:",
        items: [
          "Letting agent fees",
          "Property maintenance and repairs (not improvements)",
          "Insurance (landlord, building, contents)",
          "Accountancy fees",
          "Ground rent and service charges",
          "Council tax and utilities (if you pay them)",
          "Advertising for tenants"
        ]
      },
      {
        heading: "Mortgage Interest Changes",
        content: "Since April 2020, landlords can no longer deduct mortgage interest as an expense. Instead, you get a tax credit at the basic rate (20%) regardless of your tax bracket.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: If you pay £10,000 in mortgage interest and you're a 40% taxpayer, you used to save £4,000 in tax. Now you only get a £2,000 tax credit (20% of £10,000). That's £2,000 extra tax per year!"
      },
      {
        type: "warning",
        content: "These mortgage interest changes hit higher-rate taxpayers hardest and made limited company ownership more attractive for many landlords."
      },
      {
        heading: "Capital Gains Tax (CGT)",
        content: "When you sell a BTL property, you'll pay CGT on any profit. The rates are 18% for basic rate taxpayers and 24% for higher rate taxpayers (after using your annual allowance).",
        type: "text"
      },
      {
        heading: "Limited Company Tax Treatment",
        content: "If you own property through a limited company, the tax treatment is different. The company pays corporation tax (25%) on profits, and you pay tax when extracting money as salary or dividends.",
        type: "text"
      },
      {
        type: "tip",
        content: "The best ownership structure depends on your personal circumstances. We recommend speaking to a tax adviser before deciding whether to buy personally or through a company."
      }
    ],
    relatedGuides: [
      "buy-to-let/getting-started-landlord",
      "buy-to-let/limited-company-btl"
    ]
  },

  // BAD CREDIT
  "bad-credit/mortgage-with-bad-credit": {
    slug: "mortgage-with-bad-credit",
    title: "Getting a Mortgage with Bad Credit",
    description: "Your options when you have credit issues.",
    readTime: "10 min read",
    category: "Bad Credit",
    categorySlug: "bad-credit",
    lastUpdated: "March 2024",
    keyPoints: [
      "Bad credit doesn't mean no mortgage - specialist lenders exist",
      "The type, age, and severity of credit issues matters",
      "You'll likely need a larger deposit (15-25%)",
      "Rates will be higher but can improve over time"
    ],
    content: [
      {
        heading: "Can I Get a Mortgage with Bad Credit?",
        content: "Yes, in many cases you can. While high street banks may decline you, there are specialist lenders who specifically help people with credit problems. The key is finding the right lender for your situation.",
        type: "text"
      },
      {
        heading: "What Counts as Bad Credit?",
        content: "Bad credit is a broad term covering various issues on your credit file. Some are more serious than others in the eyes of lenders.",
        type: "text"
      },
      {
        type: "list",
        content: "Common credit issues (from least to most serious):",
        items: [
          "Late payments on credit accounts",
          "Defaults on credit agreements",
          "County Court Judgements (CCJs)",
          "Debt Management Plans (DMPs)",
          "Individual Voluntary Arrangements (IVAs)",
          "Bankruptcy",
          "Repossession"
        ]
      },
      {
        heading: "Factors Lenders Consider",
        content: "Lenders don't just look at whether you have bad credit - they consider the context and how recent it is.",
        type: "text"
      },
      {
        type: "list",
        content: "Key factors that affect your application:",
        items: [
          "How long ago was the issue? (older is better)",
          "Has it been satisfied/settled?",
          "How much was it for?",
          "How many issues do you have?",
          "What caused it? (redundancy is viewed more sympathetically)",
          "Have you maintained clean credit since?"
        ]
      },
      {
        heading: "Deposit Requirements",
        content: "With bad credit, you'll typically need a larger deposit. While good credit might get you a 5% deposit mortgage, bad credit lenders often require 15-25% or more, depending on the severity of your issues.",
        type: "text"
      },
      {
        heading: "Interest Rates",
        content: "Expect to pay higher interest rates with bad credit. However, this doesn't have to be permanent. After 2-3 years of maintaining your mortgage payments, you can remortgage to a better rate as your credit rebuilds.",
        type: "text"
      },
      {
        type: "tip",
        content: "Don't apply to multiple lenders - each application leaves a footprint on your credit file and can make things worse. Come to us first and we'll find the right lender for your specific situation."
      }
    ],
    relatedGuides: [
      "bad-credit/ccj-mortgages",
      "bad-credit/improving-credit-score"
    ]
  },

  "bad-credit/improving-credit-score": {
    slug: "improving-credit-score",
    title: "Improving Your Credit Score",
    description: "Practical steps to boost your score before applying.",
    readTime: "6 min read",
    category: "Bad Credit",
    categorySlug: "bad-credit",
    lastUpdated: "March 2024",
    keyPoints: [
      "Check your credit report for errors first",
      "Register on the electoral roll",
      "Keep credit utilisation below 30%",
      "Don't apply for lots of credit before a mortgage"
    ],
    content: [
      {
        heading: "Why Your Credit Score Matters",
        content: "Your credit score influences which lenders will accept you and what interest rate you'll pay. Even small improvements can save you thousands over the life of a mortgage.",
        type: "text"
      },
      {
        heading: "Check Your Credit Report",
        content: "Start by checking your credit report with all three credit reference agencies: Experian, Equifax, and TransUnion. Look for errors - wrong addresses, accounts that aren't yours, or debts marked as unpaid when they're settled.",
        type: "text"
      },
      {
        type: "tip",
        content: "Use ClearScore (Equifax), Credit Karma (TransUnion), and Experian's free service to check all three agencies without paying."
      },
      {
        heading: "Quick Wins",
        content: "Some changes can improve your credit score relatively quickly.",
        type: "text"
      },
      {
        type: "list",
        content: "Fast ways to boost your score:",
        items: [
          "Register on the electoral roll at your current address",
          "Pay off credit card balances (or reduce to under 30% of limit)",
          "Cancel unused credit cards (or keep one for history)",
          "Fix any errors on your credit report",
          "Make sure all accounts show your current address"
        ]
      },
      {
        heading: "Longer-Term Improvements",
        content: "Some credit improvements take time but are worth the wait if you're not in a rush to apply.",
        type: "text"
      },
      {
        type: "list",
        content: "Medium-term strategies:",
        items: [
          "Pay all bills on time for 6-12 months",
          "Don't apply for new credit in the 6 months before your mortgage",
          "Keep old credit accounts open (length of credit history matters)",
          "Avoid payday loans completely",
          "Consider a credit builder credit card (used responsibly)"
        ]
      },
      {
        heading: "What to Avoid",
        content: "Some things will actively hurt your credit score or mortgage chances.",
        type: "text"
      },
      {
        type: "list",
        content: "Things to avoid:",
        items: [
          "Multiple credit applications in a short period",
          "Gambling transactions on bank statements",
          "Payday loans (even if repaid on time)",
          "Going overdrawn without an arranged overdraft",
          "Missing any payments"
        ]
      }
    ],
    relatedGuides: [
      "bad-credit/mortgage-with-bad-credit",
      "bad-credit/ccj-mortgages"
    ]
  },

  // MORTGAGE TYPES
  "mortgage-types/fixed-vs-tracker": {
    slug: "fixed-vs-tracker",
    title: "Fixed Rate vs Tracker Mortgages",
    description: "Understanding the pros and cons of each type.",
    readTime: "7 min read",
    category: "Mortgage Types",
    categorySlug: "mortgage-types",
    lastUpdated: "March 2024",
    keyPoints: [
      "Fixed rates give payment certainty for 2-5 years",
      "Tracker rates follow the Bank of England base rate",
      "Fixed rates are usually slightly higher than initial tracker rates",
      "Trackers can go up OR down with base rate changes"
    ],
    content: [
      {
        heading: "Fixed Rate Mortgages",
        content: "A fixed rate mortgage locks your interest rate for a set period, typically 2, 3, 5, or sometimes 10 years. Your monthly payment stays the same regardless of what happens to interest rates in the wider economy.",
        type: "text"
      },
      {
        type: "list",
        content: "Fixed rate advantages:",
        items: [
          "Predictable monthly payments - easier to budget",
          "Protection if interest rates rise",
          "Peace of mind knowing exactly what you'll pay",
          "Good for first-time buyers or those on tight budgets"
        ]
      },
      {
        type: "list",
        content: "Fixed rate disadvantages:",
        items: [
          "You won't benefit if rates fall",
          "Usually slightly higher than initial tracker rates",
          "Early repayment charges if you want to leave early",
          "Need to remortgage when the fix ends"
        ]
      },
      {
        heading: "Tracker Mortgages",
        content: "A tracker mortgage follows the Bank of England base rate, plus a set margin. If the base rate is 5% and your tracker is base rate + 1%, you pay 6%. If the base rate drops to 4%, your rate drops to 5%.",
        type: "text"
      },
      {
        type: "list",
        content: "Tracker advantages:",
        items: [
          "You benefit when interest rates fall",
          "Initial rate often lower than equivalent fixed",
          "More transparency - you know why your rate changes",
          "Some trackers have no early repayment charges"
        ]
      },
      {
        type: "list",
        content: "Tracker disadvantages:",
        items: [
          "Payments increase when base rate rises",
          "Harder to budget as payments can change",
          "No protection from rate rises",
          "Can be stressful watching rate announcements"
        ]
      },
      {
        heading: "Which Should You Choose?",
        content: "There's no universally right answer - it depends on your circumstances and view on future interest rates.",
        type: "text"
      },
      {
        type: "tip",
        content: "If you're stretching to afford your mortgage or value predictability, a fixed rate is usually safer. If you can absorb some payment variation and think rates might fall, a tracker could save money."
      }
    ],
    relatedGuides: [
      "mortgage-types/understanding-rates",
      "mortgage-types/interest-only-mortgages"
    ]
  },

  // MORE BUY TO LET GUIDES
  "buy-to-let/hmo-mortgages": {
    slug: "hmo-mortgages",
    title: "HMO Mortgages Explained",
    description: "Higher yields with Houses of Multiple Occupation.",
    readTime: "8 min read",
    category: "Buy To Let",
    categorySlug: "buy-to-let",
    lastUpdated: "March 2024",
    keyPoints: [
      "HMOs typically generate higher rental yields than standard BTL",
      "You'll need an HMO licence for properties with 5+ unrelated tenants",
      "HMO mortgages require specialist lenders",
      "Expect to need 25-30% deposit minimum"
    ],
    content: [
      {
        heading: "What is an HMO?",
        content: "A House in Multiple Occupation (HMO) is a property rented to 3 or more tenants from 2 or more separate households, who share facilities like bathrooms or kitchens. Student houses, professional house shares, and bedsit-style properties often qualify as HMOs.",
        type: "text"
      },
      {
        heading: "Why Invest in HMOs?",
        content: "HMOs can generate significantly higher yields than standard buy-to-let properties because you're renting by the room rather than the whole property.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: A 4-bed house might rent for £1,200/month as a whole property. As an HMO with 4 rooms at £500 each, it generates £2,000/month - a 67% increase in rental income."
      },
      {
        heading: "HMO Licensing Requirements",
        content: "Mandatory licensing applies to HMOs with 5 or more tenants from 2+ households. However, many councils have introduced additional licensing schemes covering smaller HMOs. Check with your local council.",
        type: "text"
      },
      {
        type: "list",
        content: "HMO licence requirements typically include:",
        items: [
          "Minimum room sizes (6.51sqm for single, 10.22sqm for double)",
          "Adequate kitchen and bathroom facilities",
          "Fire safety measures (doors, alarms, extinguishers)",
          "Annual gas safety certificate",
          "Electrical safety certificate",
          "Fit and proper person test for landlord"
        ]
      },
      {
        heading: "HMO Mortgage Requirements",
        content: "Not all lenders offer HMO mortgages. Those that do have specific criteria.",
        type: "text"
      },
      {
        type: "list",
        content: "Typical HMO mortgage criteria:",
        items: [
          "25-30% deposit minimum",
          "Experience as a landlord often required",
          "Maximum number of bedrooms (often 6-8)",
          "Property must meet HMO licensing standards",
          "Rental calculations based on HMO income potential"
        ]
      },
      {
        type: "warning",
        content: "Converting a property to an HMO without proper planning permission and licensing is illegal and can result in significant fines. Always check requirements before purchasing."
      },
      {
        heading: "Article 4 Directions",
        content: "Some areas have Article 4 Directions removing permitted development rights for HMO conversions. This means you need planning permission to convert a property to an HMO, and permission may be refused to limit HMO concentrations in the area.",
        type: "text"
      },
      {
        type: "tip",
        content: "Research the local area thoroughly before buying. Check HMO saturation levels, Article 4 status, and licensing requirements with the local council. Some areas actively discourage new HMOs."
      }
    ],
    relatedGuides: [
      "buy-to-let/getting-started-landlord",
      "buy-to-let/btl-tax-guide"
    ]
  },

  "buy-to-let/limited-company-btl": {
    slug: "limited-company-btl",
    title: "Limited Company Buy To Let",
    description: "Is an SPV structure right for your portfolio?",
    readTime: "9 min read",
    category: "Buy To Let",
    categorySlug: "buy-to-let",
    lastUpdated: "March 2024",
    keyPoints: [
      "SPV = Special Purpose Vehicle, a company set up just for property",
      "Full mortgage interest relief for companies (not individuals)",
      "Corporation tax (25%) vs income tax (up to 45%)",
      "More complex but can be more tax-efficient for higher earners"
    ],
    content: [
      {
        heading: "What is a Limited Company BTL?",
        content: "Instead of buying property in your personal name, you set up a limited company (often called an SPV - Special Purpose Vehicle) to purchase and own the property. The company takes out the mortgage and receives the rental income.",
        type: "text"
      },
      {
        heading: "Why the Change?",
        content: "Before April 2017, landlords could deduct mortgage interest from rental income before calculating tax. The government gradually removed this relief for individual landlords, but companies can still claim full mortgage interest relief.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: £1,000 monthly rent, £600 mortgage interest. As an individual higher-rate taxpayer, you pay 40% tax on the full £1,000 rent (£400), then get a 20% tax credit on the interest (£120). Net tax: £280. In a company, you pay corporation tax on £400 profit (£100). Potential saving: £180/month."
      },
      {
        heading: "When Does Company Ownership Make Sense?",
        content: "Company ownership isn't right for everyone. It depends on your tax situation, plans, and portfolio size.",
        type: "text"
      },
      {
        type: "list",
        content: "Consider a company structure if:",
        items: [
          "You're a higher-rate (40%) or additional-rate (45%) taxpayer",
          "You plan to build a portfolio of multiple properties",
          "You don't need the rental income to live on",
          "You're comfortable with company admin and accountancy",
          "You're starting fresh (no existing properties to transfer)"
        ]
      },
      {
        type: "list",
        content: "Personal ownership may be better if:",
        items: [
          "You're a basic-rate taxpayer",
          "You have just one or two properties",
          "You need the rental income for living expenses",
          "You want simplicity over tax optimisation",
          "You already own properties personally (transferring triggers CGT and stamp duty)"
        ]
      },
      {
        heading: "Setting Up an SPV",
        content: "Setting up a company is straightforward and costs around £12-50 through Companies House. However, you need the right SIC codes for property activities.",
        type: "text"
      },
      {
        type: "list",
        content: "Common SPV SIC codes:",
        items: [
          "68100 - Buying and selling of own real estate",
          "68201 - Renting and operating of own or leased real estate",
          "68209 - Other letting of own property"
        ]
      },
      {
        heading: "Mortgage Considerations",
        content: "Limited company mortgages typically have slightly higher rates than personal BTL mortgages, though the gap has narrowed. Not all lenders offer them, but the market has grown significantly.",
        type: "text"
      },
      {
        type: "tip",
        content: "Most SPV lenders require personal guarantees from directors. This means you're personally liable if the company defaults on the mortgage - it's not a way to limit your liability."
      },
      {
        heading: "Ongoing Costs and Admin",
        content: "Running a company involves additional costs and responsibilities.",
        type: "text"
      },
      {
        type: "list",
        content: "Company running costs:",
        items: [
          "Accountancy fees (£500-£2,000+ per year)",
          "Company tax return (CT600) filing",
          "Annual confirmation statement to Companies House",
          "Keeping proper company records",
          "Potential dividend tax when extracting profits"
        ]
      },
      {
        type: "warning",
        content: "Don't transfer existing properties into a company without professional advice. You'll trigger Capital Gains Tax on the transfer and pay stamp duty as if buying the property again."
      }
    ],
    relatedGuides: [
      "buy-to-let/btl-tax-guide",
      "buy-to-let/getting-started-landlord"
    ]
  },

  // MORE BAD CREDIT GUIDES
  "bad-credit/ccj-mortgages": {
    slug: "ccj-mortgages",
    title: "CCJ Mortgages Explained",
    description: "How CCJs affect your application and what lenders accept them.",
    readTime: "7 min read",
    category: "Bad Credit",
    categorySlug: "bad-credit",
    lastUpdated: "March 2024",
    keyPoints: [
      "CCJs stay on your credit file for 6 years",
      "Satisfied CCJs are viewed more favourably than unsatisfied",
      "Some lenders accept CCJs from day 1, others require time to pass",
      "Larger deposits improve your chances significantly"
    ],
    content: [
      {
        heading: "What is a CCJ?",
        content: "A County Court Judgement (CCJ) is a court order that can be registered against you if you fail to repay money you owe. It's one of the more serious forms of adverse credit and stays on your credit file for 6 years.",
        type: "text"
      },
      {
        heading: "How CCJs Affect Mortgage Applications",
        content: "CCJs make mortgage applications more difficult but not impossible. High street banks will typically decline you, but specialist lenders exist specifically to help people in this situation.",
        type: "text"
      },
      {
        type: "list",
        content: "Factors lenders consider with CCJs:",
        items: [
          "How old is the CCJ? (older is better)",
          "Has it been satisfied (paid)? (satisfied is better)",
          "How much was it for? (smaller is better)",
          "How many CCJs do you have? (fewer is better)",
          "What was it for? (some causes viewed more sympathetically)",
          "How's your credit been since? (clean recent history helps)"
        ]
      },
      {
        heading: "Satisfied vs Unsatisfied CCJs",
        content: "If you pay the debt within one month of the CCJ being issued, you can apply to have it removed from the register entirely. If you pay after one month, the CCJ remains but is marked as 'satisfied', which is viewed much more favourably by lenders.",
        type: "text"
      },
      {
        type: "tip",
        content: "If you have an outstanding CCJ, consider paying it before applying for a mortgage. Even if it's old, an unsatisfied CCJ looks worse than a satisfied one to lenders."
      },
      {
        heading: "Deposit Requirements",
        content: "With CCJs on your file, you'll typically need a larger deposit. While some lenders may consider 15%, most will want 20-25% or more, especially for recent or unsatisfied CCJs.",
        type: "text"
      },
      {
        heading: "Which Lenders Accept CCJs?",
        content: "Specialist adverse credit lenders have criteria specifically designed for people with CCJs. Some will consider applications even with recent or unsatisfied CCJs, though terms will reflect the risk.",
        type: "text"
      },
      {
        type: "list",
        content: "Examples of CCJ-friendly criteria:",
        items: [
          "Some lenders accept satisfied CCJs from day 1",
          "Others require 1-2 years since the CCJ was registered",
          "Maximum CCJ values vary (often £500-£5,000 total)",
          "Some ignore CCJs under a certain value (e.g., £300)",
          "Unsatisfied CCJs usually need longer time passed"
        ]
      },
      {
        type: "warning",
        content: "Be honest about your CCJs. Lenders will find them on your credit file anyway, and being upfront helps us find the right lender for your situation first time."
      },
      {
        heading: "Improving Your Chances",
        content: "While you can't remove a CCJ from your file (unless it was issued incorrectly), you can improve your chances of approval.",
        type: "text"
      },
      {
        type: "list",
        content: "Steps to improve your CCJ mortgage chances:",
        items: [
          "Pay off the CCJ if possible (get it marked as satisfied)",
          "Save a larger deposit (25%+ opens more options)",
          "Maintain clean credit since the CCJ",
          "Use a specialist broker (like us!) who knows which lenders suit your situation",
          "Be patient - time passing helps as the CCJ ages"
        ]
      }
    ],
    relatedGuides: [
      "bad-credit/mortgage-with-bad-credit",
      "bad-credit/improving-credit-score"
    ]
  },

  "bad-credit/mortgages-after-bankruptcy": {
    slug: "mortgages-after-bankruptcy",
    title: "Mortgages After Bankruptcy",
    description: "Timelines and options after discharge.",
    readTime: "8 min read",
    category: "Bad Credit",
    categorySlug: "bad-credit",
    lastUpdated: "March 2024",
    keyPoints: [
      "Bankruptcy is discharged after 1 year (usually)",
      "Some lenders will consider you from day 1 of discharge",
      "More options become available after 3 years, even more after 6",
      "You'll need a larger deposit (typically 25%+)"
    ],
    content: [
      {
        heading: "Understanding Bankruptcy Discharge",
        content: "When you're declared bankrupt, you're usually discharged after 12 months (this can be extended if you don't cooperate). After discharge, you're released from most of your debts and can start rebuilding your financial life - including getting a mortgage.",
        type: "text"
      },
      {
        heading: "Can I Get a Mortgage After Bankruptcy?",
        content: "Yes, absolutely. While bankruptcy is the most serious form of adverse credit, specialist lenders exist who will consider applications from discharged bankrupts. The key factors are how long since discharge, your deposit, and your credit behaviour since.",
        type: "text"
      },
      {
        heading: "Timeline After Discharge",
        content: "Your options improve significantly as time passes from your discharge date.",
        type: "text"
      },
      {
        type: "list",
        content: "Typical timeline for mortgage options:",
        items: [
          "Day 1 of discharge - A few specialist lenders may consider (high rates, 30%+ deposit)",
          "1 year after discharge - More options available, still specialist market",
          "3 years after discharge - Significantly more lenders, better rates",
          "6 years after discharge - Bankruptcy drops off credit file, near-normal options"
        ]
      },
      {
        type: "tip",
        content: "Bankruptcy is removed from your credit file 6 years after the bankruptcy ORDER date, not the discharge date. However, many lenders focus on time since discharge."
      },
      {
        heading: "Deposit Requirements",
        content: "You'll need a substantial deposit when applying after bankruptcy. Most lenders want at least 25%, with some requiring 30% or more, especially if it's soon after discharge.",
        type: "text"
      },
      {
        heading: "Explaining the Bankruptcy",
        content: "Lenders will want to understand what caused the bankruptcy. Some causes are viewed more sympathetically than others.",
        type: "text"
      },
      {
        type: "list",
        content: "Causes viewed more sympathetically:",
        items: [
          "Business failure (especially in economic downturn)",
          "Relationship breakdown / divorce",
          "Serious illness affecting ability to work",
          "Redundancy and inability to find work",
          "Being a victim of fraud"
        ]
      },
      {
        type: "list",
        content: "Causes that raise concerns:",
        items: [
          "Reckless spending or gambling",
          "Multiple bankruptcies",
          "Fraud or dishonesty",
          "Bankruptcy restrictions order (BRO) extended discharge"
        ]
      },
      {
        heading: "Rebuilding Credit After Bankruptcy",
        content: "Your credit file is essentially reset after bankruptcy, but this isn't necessarily bad. It's a chance to build a clean credit history.",
        type: "text"
      },
      {
        type: "list",
        content: "Steps to rebuild credit:",
        items: [
          "Get on the electoral roll",
          "Consider a credit builder credit card (use responsibly)",
          "Keep all bills paid on time",
          "Avoid applications for credit you don't need",
          "Check your credit file for errors regularly"
        ]
      },
      {
        type: "warning",
        content: "Don't hide your bankruptcy history. Lenders will find it, and failing to disclose could be considered fraud. Be upfront and let us find the right lender for your situation."
      }
    ],
    relatedGuides: [
      "bad-credit/mortgage-with-bad-credit",
      "bad-credit/ccj-mortgages"
    ]
  },

  // MORE MORTGAGE TYPES GUIDES
  "mortgage-types/interest-only-mortgages": {
    slug: "interest-only-mortgages",
    title: "Interest Only Mortgages Explained",
    description: "When they make sense and the repayment strategies you need.",
    readTime: "6 min read",
    category: "Mortgage Types",
    categorySlug: "mortgage-types",
    lastUpdated: "March 2024",
    keyPoints: [
      "You only pay interest each month - not the loan itself",
      "Much lower monthly payments than repayment mortgages",
      "You need a credible plan to repay the loan at the end",
      "Common for buy-to-let, less so for residential"
    ],
    content: [
      {
        heading: "What is an Interest Only Mortgage?",
        content: "With an interest only mortgage, your monthly payments only cover the interest on the loan. You don't pay off any of the original amount borrowed (the capital) during the mortgage term. At the end, you still owe the full amount you borrowed.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: Borrow £200,000 over 25 years at 5%. Repayment mortgage: £1,169/month. Interest only: £833/month. You save £336/month BUT after 25 years you still owe £200,000."
      },
      {
        heading: "Why Choose Interest Only?",
        content: "The lower monthly payments can be attractive, and for some strategies it makes financial sense.",
        type: "text"
      },
      {
        type: "list",
        content: "Reasons people choose interest only:",
        items: [
          "Lower monthly outgoings",
          "Buy-to-let investors (plan to sell property to repay)",
          "People expecting a future inheritance",
          "Those with other investments growing faster than mortgage interest",
          "Temporary measure while income is reduced",
          "Part of retirement planning with planned downsizing"
        ]
      },
      {
        heading: "Repayment Vehicles",
        content: "Lenders need to see a credible plan for how you'll repay the capital at the end. These are called 'repayment vehicles'.",
        type: "text"
      },
      {
        type: "list",
        content: "Acceptable repayment vehicles:",
        items: [
          "Sale of the mortgaged property (BTL only usually)",
          "Sale of another property",
          "Investments (ISAs, shares, bonds)",
          "Pension lump sum",
          "Endowment policies (less common now)",
          "Inheritance (some lenders)"
        ]
      },
      {
        type: "warning",
        content: "Lenders will want evidence your repayment vehicle is realistic. 'I'll figure it out' isn't a repayment strategy. Many people from the 1980s-90s endowment mortgage era found this out the hard way when their plans fell short."
      },
      {
        heading: "Interest Only for Residential Mortgages",
        content: "Getting an interest only residential mortgage is harder than it used to be. Most lenders now require a minimum loan amount (often £75,000-£300,000) and a maximum loan-to-value (often 50-75%).",
        type: "text"
      },
      {
        heading: "Interest Only for Buy-to-Let",
        content: "Interest only is much more common for buy-to-let mortgages. The plan is usually to sell the property at the end of the term to repay the loan, hopefully at a profit after capital appreciation.",
        type: "text"
      },
      {
        type: "tip",
        content: "Consider a part-and-part mortgage: some of your payment covers interest only, some is repayment. This gives lower payments than full repayment while still reducing the balance over time."
      }
    ],
    relatedGuides: [
      "mortgage-types/fixed-vs-tracker",
      "mortgage-types/understanding-rates"
    ]
  },

  "mortgage-types/offset-mortgages": {
    slug: "offset-mortgages",
    title: "Offset Mortgages: Are They Worth It?",
    description: "Using your savings to reduce mortgage interest.",
    readTime: "8 min read",
    category: "Mortgage Types",
    categorySlug: "mortgage-types",
    lastUpdated: "March 2024",
    keyPoints: [
      "Your savings offset your mortgage balance for interest calculations",
      "You don't earn interest on savings but save mortgage interest instead",
      "Tax-efficient for higher-rate taxpayers",
      "Good if you want access to savings while reducing interest"
    ],
    content: [
      {
        heading: "What is an Offset Mortgage?",
        content: "An offset mortgage links your savings account to your mortgage. The balance in your savings is 'offset' against your mortgage balance when calculating interest. You pay interest only on the difference.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: £200,000 mortgage and £50,000 in linked savings. You pay interest on £150,000 (the difference). If your rate is 5%, you save £2,500 per year in mortgage interest."
      },
      {
        heading: "How Does it Work?",
        content: "Your savings don't actually pay off the mortgage - they remain accessible in your savings account. But for interest calculation purposes, they reduce your mortgage balance. Most offset mortgages let you withdraw savings whenever you need them.",
        type: "text"
      },
      {
        heading: "The Tax Advantage",
        content: "You don't earn interest on offset savings accounts - that's the trade-off. But for higher-rate taxpayers, this can actually be beneficial.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: £50,000 savings earning 4% = £2,000 interest. As a 40% taxpayer, you'd pay £800 tax, keeping £1,200. But offsetting that £50,000 against a 5% mortgage saves £2,500 - tax free. You're £1,300 better off."
      },
      {
        type: "list",
        content: "Who benefits most from offset mortgages:",
        items: [
          "Higher-rate (40%) and additional-rate (45%) taxpayers",
          "People with substantial savings (£20,000+)",
          "Those who want emergency fund access without actually using it",
          "Self-employed people who need to hold cash for tax bills",
          "Anyone who values flexibility"
        ]
      },
      {
        heading: "The Downsides",
        content: "Offset mortgages aren't for everyone. There are some drawbacks to consider.",
        type: "text"
      },
      {
        type: "list",
        content: "Potential downsides:",
        items: [
          "Interest rates are often slightly higher than equivalent standard mortgages",
          "You need significant savings to make a real difference",
          "No interest earned on savings (opportunity cost)",
          "More complex - some people prefer simplicity",
          "Fewer lenders offer them, so less choice"
        ]
      },
      {
        heading: "When Offset Makes Sense",
        content: "Do the maths for your situation. If the mortgage interest saved (after your tax rate) exceeds what you'd earn in a savings account (after tax), offset wins.",
        type: "text"
      },
      {
        type: "tip",
        content: "Offset mortgages are great for 'pot' money - savings you need to keep accessible for tax bills, home improvements, or emergencies. Your money works harder without being locked away."
      },
      {
        heading: "Family Offset Mortgages",
        content: "Some lenders allow family members to link their savings to your mortgage. Parents can help children with their mortgage without giving money away - they retain ownership of their savings while reducing your interest.",
        type: "text"
      }
    ],
    relatedGuides: [
      "mortgage-types/fixed-vs-tracker",
      "mortgage-types/interest-only-mortgages"
    ]
  },

  "mortgage-types/understanding-rates": {
    slug: "understanding-rates",
    title: "Understanding Mortgage Rates",
    description: "How rates are set and what affects your personal rate.",
    readTime: "5 min read",
    category: "Mortgage Types",
    categorySlug: "mortgage-types",
    lastUpdated: "March 2024",
    keyPoints: [
      "Bank of England base rate influences all mortgage rates",
      "Your personal rate depends on LTV, credit score, and product type",
      "Lower LTV = better rates (more equity = less risk for lender)",
      "Fixed rates include lender's prediction of future rate changes"
    ],
    content: [
      {
        heading: "What Determines Mortgage Rates?",
        content: "Mortgage rates are influenced by several factors, from global economics down to your personal financial situation. Understanding these helps you make sense of the rates you're offered.",
        type: "text"
      },
      {
        heading: "The Bank of England Base Rate",
        content: "The Bank of England sets the base rate (or Bank Rate) which influences the cost of borrowing across the economy. When the base rate rises, mortgage rates typically follow. When it falls, mortgage rates usually drop too - though not always immediately or by the same amount.",
        type: "text"
      },
      {
        heading: "Swap Rates",
        content: "Lenders use 'swap rates' to hedge their fixed rate mortgages. These are financial instruments that let them lock in their own borrowing costs. When swap rates rise, fixed mortgage rates typically rise too, sometimes before the base rate changes.",
        type: "text"
      },
      {
        type: "tip",
        content: "Swap rates can rise or fall independently of the base rate, which is why fixed rates sometimes move when the base rate hasn't changed. Lenders are pricing in expected future changes."
      },
      {
        heading: "Factors That Affect Your Personal Rate",
        content: "Beyond the general economic factors, your personal circumstances determine the exact rate you'll be offered.",
        type: "text"
      },
      {
        type: "list",
        content: "Personal factors affecting your rate:",
        items: [
          "Loan-to-Value (LTV) - lower LTV = better rates",
          "Credit score - better credit = better rates",
          "Property type - standard houses get better rates than flats above commercial premises",
          "Employment type - employed often better than self-employed",
          "Mortgage amount - some lenders have minimum loan amounts for best rates",
          "Repayment type - repayment often cheaper than interest-only"
        ]
      },
      {
        heading: "LTV and Rates",
        content: "Your Loan-to-Value ratio has a significant impact on the rates available to you. Lenders price in bands, typically 95%, 90%, 85%, 80%, 75%, and 60% LTV.",
        type: "text"
      },
      {
        type: "example",
        content: "Example: A lender might offer 5.5% at 95% LTV, 5.0% at 90% LTV, 4.5% at 75% LTV, and 4.0% at 60% LTV. That extra deposit really does make a difference!"
      },
      {
        heading: "Headline Rate vs True Cost",
        content: "Don't just compare headline interest rates. Consider the total cost including fees. A slightly higher rate with no fee can be cheaper than a lower rate with a £1,000+ arrangement fee, especially for smaller mortgages or shorter fix periods.",
        type: "text"
      },
      {
        type: "list",
        content: "True cost factors to consider:",
        items: [
          "Interest rate",
          "Arrangement/product fee",
          "Valuation fee (if charged)",
          "Legal fees (if not included free)",
          "Early repayment charges (if you might move)",
          "Cashback offers (subtract from costs)"
        ]
      },
      {
        type: "tip",
        content: "We calculate the true total cost for every mortgage we recommend, factoring in all fees and incentives. That's why our recommendation might not always be the lowest headline rate."
      }
    ],
    relatedGuides: [
      "mortgage-types/fixed-vs-tracker",
      "mortgage-types/offset-mortgages"
    ]
  },

  // ======== 2026 CONTENT MARKETING ARTICLES ========

  "market-updates/mortgage-rates-forecast-2026": {
    slug: "mortgage-rates-forecast-2026",
    title: "Mortgage Rates Forecast 2026: What to Expect",
    description: "Expert analysis of UK mortgage rate predictions for 2026 and what it means for buyers and homeowners.",
    readTime: "8 min read",
    category: "Market Updates",
    categorySlug: "market-updates",
    lastUpdated: "April 2026",
    keyPoints: [
      "Base rate expected to stabilise around 4-4.5%",
      "Fixed rates becoming more competitive",
      "Now could be a good time to lock in rates",
      "Remortgagers should act before SVR kicks in"
    ],
    content: [
      {
        heading: "Current Mortgage Rate Landscape",
        content: "As we move through 2026, the UK mortgage market continues to evolve. After the volatility of recent years, we're seeing more stability in mortgage rates, though they remain higher than the historic lows we saw pre-2022.",
        type: "text"
      },
      {
        heading: "What's Happening with the Base Rate?",
        content: "The Bank of England base rate currently sits at around 4.25%, having gradually decreased from its 2023 peak. Most economists predict it will stabilise in the 4-4.5% range throughout 2026, with potential for modest decreases if inflation remains controlled.",
        type: "text"
      },
      {
        type: "tip",
        content: "Don't wait for rates to drop significantly - the difference between a 4.5% and 4% rate on a £250,000 mortgage is about £70/month. If waiting costs you 6 months on a higher rate, you've already lost the benefit."
      },
      {
        heading: "Fixed Rate Predictions",
        content: "Two-year fixed rates are currently averaging around 5.2-5.5%, while five-year fixes sit at 4.8-5.1%. Competition among lenders is increasing, which is pushing rates down.",
        type: "text"
      },
      {
        heading: "Our Advice",
        content: "Mortgage rates are unlikely to return to the sub-2% levels we saw a few years ago anytime soon. Rather than waiting for a perfect moment that may never come, focus on finding the best available rate for your circumstances today. As whole-of-market brokers, we can search 90+ lenders to find you the most competitive deal.",
        type: "text"
      }
    ],
    relatedGuides: [
      "remortgaging/when-to-remortgage",
      "first-time-buyers/complete-first-home-guide"
    ]
  },

  "market-updates/best-time-to-buy-house-2026": {
    slug: "best-time-to-buy-house-2026",
    title: "Is 2026 a Good Time to Buy a House?",
    description: "Analysis of the current property market and whether now is the right time to buy your first home or move.",
    readTime: "7 min read",
    category: "Market Updates",
    categorySlug: "market-updates",
    lastUpdated: "April 2026",
    keyPoints: [
      "House prices have stabilised after 2023-2024 adjustments",
      "Mortgage rates more competitive than 2023",
      "Rental costs make buying more attractive",
      "Your personal circumstances matter more than market timing"
    ],
    content: [
      {
        heading: "The 2026 Property Market",
        content: "After a period of adjustment in 2023-2024, the UK property market has found more stable footing in 2026. House prices have broadly stabilised, with modest growth in some areas and continued softness in others.",
        type: "text"
      },
      {
        heading: "Should You Wait?",
        content: "Trying to time the market perfectly is nearly impossible. If you're financially ready, have a stable income, and have found a property you want to call home, the personal benefits of homeownership often outweigh waiting for potentially lower prices or rates.",
        type: "text"
      },
      {
        type: "warning",
        content: "House prices have historically risen over the long term. Waiting a year for a potential 5% price drop could backfire if prices rise 3% instead."
      },
      {
        heading: "The Bottom Line",
        content: "2026 offers a more balanced market than recent years. The key question isn't 'is it a good time to buy' but 'am I ready to buy?' - and that depends on your personal financial situation, job security, and life plans.",
        type: "text"
      }
    ],
    relatedGuides: [
      "first-time-buyers/deposit-requirements",
      "market-updates/mortgage-rates-forecast-2026"
    ]
  },

  "self-employed/how-much-can-self-employed-borrow": {
    slug: "how-much-can-self-employed-borrow",
    title: "How Much Can Self-Employed People Borrow?",
    description: "Complete guide to mortgage borrowing for self-employed borrowers, contractors, and company directors.",
    readTime: "10 min read",
    category: "Self-Employed",
    categorySlug: "self-employed",
    lastUpdated: "April 2026",
    keyPoints: [
      "Most lenders require 2-3 years of accounts",
      "Company directors can use salary + dividends OR net profit",
      "Contractors may use day rate calculations",
      "Using the right lender can increase borrowing by 40%+"
    ],
    content: [
      {
        heading: "Self-Employed Mortgage Borrowing",
        content: "Getting a mortgage when you're self-employed isn't harder than for employed people - it's just different. Understanding how lenders assess your income is key to maximising what you can borrow.",
        type: "text"
      },
      {
        heading: "How Lenders Calculate Self-Employed Income",
        content: "Different lenders have different approaches, and using the right one for your situation can significantly increase your borrowing power.",
        type: "text"
      },
      {
        type: "list",
        content: "Income calculation methods:",
        items: [
          "Sole Traders: Net profit from your tax returns",
          "Ltd Company Directors: Salary + dividends OR salary + share of net profit",
          "Contractors: Day rate x working days OR standard director calculation"
        ]
      },
      {
        heading: "The Net Profit Advantage",
        content: "If you're a company director who's tax-efficient (low salary, moderate dividends, profits retained in company), specialist lenders can use your share of company net profit instead, often allowing 40%+ more borrowing.",
        type: "text"
      }
    ],
    relatedGuides: [
      "first-time-buyers/complete-first-home-guide"
    ]
  },

  "protection/do-i-need-life-insurance-mortgage": {
    slug: "do-i-need-life-insurance-mortgage",
    title: "Do I Need Life Insurance for My Mortgage?",
    description: "Understanding life insurance, when it's required, and how to protect your home and family.",
    readTime: "6 min read",
    category: "Protection",
    categorySlug: "protection",
    lastUpdated: "April 2026",
    keyPoints: [
      "Life insurance isn't legally required but strongly recommended",
      "Covers mortgage if you die during the term",
      "Can cost less than £10/month for basic cover",
      "Critical illness cover adds protection for serious illness"
    ],
    content: [
      {
        heading: "Is Life Insurance Mandatory?",
        content: "No, life insurance is not a legal requirement for getting a mortgage in the UK. However, it's strongly recommended - especially if you have dependents or someone relies on your income to pay the mortgage.",
        type: "text"
      },
      {
        type: "warning",
        content: "The average UK mortgage is over £200,000. Without life insurance, your family could face losing their home on top of losing you."
      },
      {
        heading: "Types of Life Insurance for Mortgages",
        content: "There are several types of life insurance to consider, including decreasing term, level term, and family income benefit.",
        type: "text"
      },
      {
        heading: "Getting the Right Cover",
        content: "The best protection depends on your circumstances. We can help you understand your options and find competitive quotes.",
        type: "text"
      }
    ],
    relatedGuides: [
      "first-time-buyers/complete-first-home-guide"
    ]
  },

  "bad-credit/how-to-improve-credit-score-fast": {
    slug: "how-to-improve-credit-score-fast",
    title: "How to Improve Your Credit Score Fast",
    description: "Practical steps to boost your credit score before applying for a mortgage.",
    readTime: "8 min read",
    category: "Bad Credit",
    categorySlug: "bad-credit",
    lastUpdated: "April 2026",
    keyPoints: [
      "Check your credit report for errors first",
      "Get on the electoral roll",
      "Reduce credit utilisation below 30%",
      "Some improvements can show in weeks"
    ],
    content: [
      {
        heading: "Understanding Your Credit Score",
        content: "Your credit score is a number that summarises your creditworthiness. Lenders use this alongside your full credit report to assess risk. A higher score gives you access to better mortgage rates.",
        type: "text"
      },
      {
        heading: "Step 1: Check Your Credit Reports",
        content: "Start by checking your credit reports with all three main agencies: Experian, Equifax, and TransUnion (via Credit Karma). Different lenders check different agencies.",
        type: "text"
      },
      {
        type: "tip",
        content: "Use a free service like CheckMyFile to see all three credit reports in one place. They offer a 30-day free trial."
      },
      {
        heading: "Step 2: Get on the Electoral Roll",
        content: "This is one of the quickest wins. Being registered to vote at your current address helps lenders verify your identity and address.",
        type: "text"
      },
      {
        heading: "How Long Will Improvement Take?",
        content: "Some changes show within 1-2 months (reducing utilisation, getting on electoral roll). Others take longer - negative marks like missed payments stay on your file for 6 years but their impact reduces over time.",
        type: "text"
      }
    ],
    relatedGuides: [
      "first-time-buyers/complete-first-home-guide",
      "remortgaging/when-to-remortgage"
    ]
  }
};

// Helper function to get a guide by full path
export function getGuide(category: string, slug: string): GuideArticle | undefined {
  const key = `${category}/${slug}`;
  return guidesData[key];
}

// Helper function to get all guides in a category
export function getGuidesByCategory(categorySlug: string): GuideArticle[] {
  return Object.values(guidesData).filter(
    (guide) => guide.categorySlug === categorySlug
  );
}

// Helper function to get related guides
export function getRelatedGuides(paths: string[]): GuideArticle[] {
  return paths
    .map((path) => guidesData[path])
    .filter((guide): guide is GuideArticle => guide !== undefined);
}
