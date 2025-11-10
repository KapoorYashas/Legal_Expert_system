"""
Legal Expert System - IPC to BNS Mapping
Based on Indian Penal Code and Bharatiya Nyaya Sanhita
"""

rules = [
    # Hurts Category
    {
        "Category": {"Hurts", "Violence", "Physical Harm"},
        "IPC": "323",
        "BNS": "115(2)",
        "Description": "Voluntarily causing hurt"
    },
    {
        "Category": {"Hurts", "Violence", "Grievous Hurt"},
        "IPC": "325",
        "BNS": "117(2)",
        "Description": "Voluntarily causing grievous hurt"
    },
    {
        "Category": {"Hurts", "Violence", "Grievous Hurt"},
        "IPC": "324",
        "BNS": "118(1)",
        "Description": "Voluntarily causing hurt by dangerous weapons"
    },
    {
        "Category": {"Hurts", "Violence", "Grievous Hurt"},
        "IPC": "326",
        "BNS": "118(2)",
        "Description": "Voluntarily causing grievous hurt by dangerous weapons"
    },
    {
        "Category": {"Hurts", "Violence", "Acid Attack"},
        "IPC": "326(A)",
        "BNS": "124(1)",
        "Description": "Voluntarily causing grievous hurt by acid"
    },
    {
        "Category": {"Hurts", "Violence", "Acid Attack"},
        "IPC": "326(B)",
        "BNS": "124(2)",
        "Description": "Voluntarily throwing acid"
    },
    {
        "Category": {"Hurts", "Violence", "Assault"},
        "IPC": "332",
        "BNS": "121(1)",
        "Description": "Voluntarily causing hurt to deter public servant"
    },
    {
        "Category": {"Hurts", "Violence", "Assault"},
        "IPC": "333",
        "BNS": "121(2)",
        "Description": "Voluntarily causing grievous hurt to deter public servant"
    },
    
    # Accidents Category
    {
        "Category": {"Accidents", "Negligence", "Death"},
        "IPC": "279",
        "BNS": "281",
        "Description": "Rash driving on public way"
    },
    {
        "Category": {"Accidents", "Negligence", "Death"},
        "IPC": "337",
        "BNS": "125(a)",
        "Description": "Causing hurt by act endangering life"
    },
    {
        "Category": {"Accidents", "Negligence", "Grievous Hurt"},
        "IPC": "338",
        "BNS": "125(b)",
        "Description": "Causing grievous hurt by act endangering life"
    },
    {
        "Category": {"Accidents", "Negligence", "Culpable Homicide"},
        "IPC": "304(A)",
        "BNS": "106",
        "Description": "Causing death by negligence"
    },
    
    # Right of Way Sections
    {
        "Category": {"Right of Way", "Public Property", "Obstruction"},
        "IPC": "34",
        "BNS": "3(5)",
        "Description": "Acts done by several persons in furtherance of common intention"
    },
    {
        "Category": {"Right of Way", "Public Property", "Obstruction"},
        "IPC": "149",
        "BNS": "150",
        "Description": "Unlawful assembly guilty of offense"
    },
    {
        "Category": {"Right of Way", "Public Property", "Obstruction"},
        "IPC": "511",
        "BNS": "62",
        "Description": "Attempting to commit offenses"
    },
    
    # Murders Category
    {
        "Category": {"Murders", "Homicide", "Death"},
        "IPC": "302",
        "BNS": "103",
        "Description": "Punishment for murder"
    },
    {
        "Category": {"Murders", "Homicide", "Culpable Homicide"},
        "IPC": "304",
        "BNS": "105",
        "Description": "Culpable homicide not amounting to murder"
    },
    {
        "Category": {"Murders", "Homicide", "Abetment"},
        "IPC": "304(B)",
        "BNS": "80",
        "Description": "Dowry death"
    },
    
    # Tresspass Category
    {
        "Category": {"Trespass", "Property", "Criminal Trespass"},
        "IPC": "447",
        "BNS": "329(3)",
        "Description": "Criminal trespass"
    },
    {
        "Category": {"Trespass", "Property", "House Trespass"},
        "IPC": "448",
        "BNS": "329(4)",
        "Description": "House trespass"
    },
    {
        "Category": {"Trespass", "Property", "House Trespass", "Hurt"},
        "IPC": "452",
        "BNS": "333",
        "Description": "House trespass after preparation for hurt"
    },
    {
        "Category": {"Trespass", "Property", "Lurking House Trespass"},
        "IPC": "454",
        "BNS": "331(3)",
        "Description": "Lurking house trespass"
    },
    
    # Women Related Crimes
    {
        "Category": {"Women", "Gender Crime", "Outraging Modesty"},
        "IPC": "294",
        "BNS": "296",
        "Description": "Obscene acts in public"
    },
    {
        "Category": {"Women", "Gender Crime", "Outraging Modesty"},
        "IPC": "509",
        "BNS": "79",
        "Description": "Insulting modesty of woman"
    },
    {
        "Category": {"Women", "Gender Crime", "Assault"},
        "IPC": "354",
        "BNS": "74",
        "Description": "Assault on woman with intent to outrage modesty"
    },
    {
        "Category": {"Women", "Gender Crime", "Assault"},
        "IPC": "354(A)",
        "BNS": "75",
        "Description": "Sexual harassment"
    },
    {
        "Category": {"Women", "Gender Crime", "Assault"},
        "IPC": "354(b)",
        "BNS": "76",
        "Description": "Assault or use of criminal force with intent to disrobe"
    },
    {
        "Category": {"Women", "Gender Crime", "Voyeurism"},
        "IPC": "354(c)",
        "BNS": "77",
        "Description": "Voyeurism"
    },
    {
        "Category": {"Women", "Gender Crime", "Stalking"},
        "IPC": "354(d)",
        "BNS": "78",
        "Description": "Stalking"
    },
    {
        "Category": {"Women", "Marriage", "Bigamy"},
        "IPC": "494(A)",
        "BNS": "85",
        "Description": "Marrying again during lifetime of spouse"
    },
    {
        "Category": {"Women", "Marriage", "Concealment"},
        "IPC": "494",
        "BNS": "82(1)",
        "Description": "Marriage by concealing earlier marriage"
    },
    
    # Rape Category
    {
        "Category": {"Rape", "Sexual Offense", "Violence"},
        "IPC": "376",
        "BNS": "64",
        "Description": "Rape"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Violence"},
        "IPC": "376(A)",
        "BNS": "65(1)",
        "Description": "Causing death or vegetative state while committing rape"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Gang Rape"},
        "IPC": "376(AB)",
        "BNS": "65(2)",
        "Description": "Rape on woman under 12 years"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Violence"},
        "IPC": "376(D)",
        "BNS": "67",
        "Description": "Gang rape"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Authority"},
        "IPC": "376(C)",
        "BNS": "68",
        "Description": "Rape by person in position of authority"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Custodial Rape"},
        "IPC": "376(B)",
        "BNS": "70(1)",
        "Description": "Rape by husband during separation"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Minor"},
        "IPC": "376(DA)",
        "BNS": "70(2)",
        "Description": "Gang rape on woman under 16 years"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Minor"},
        "IPC": "376(DB)",
        "BNS": "70",
        "Description": "Gang rape on woman under 12 years"
    },
    {
        "Category": {"Rape", "Sexual Offense", "Repeat Offender"},
        "IPC": "376(E)",
        "BNS": "71",
        "Description": "Repeat offenders"
    },
    
    # Thefts Category
    {
        "Category": {"Thefts", "Property Crime", "Theft"},
        "IPC": "379",
        "BNS": "303(2)",
        "Description": "Theft"
    },
    {
        "Category": {"Thefts", "Property Crime", "Theft"},
        "IPC": "380",
        "BNS": "305",
        "Description": "Theft in dwelling house"
    },
    {
        "Category": {"Thefts", "Property Crime", "Theft", "Hurt"},
        "IPC": "382",
        "BNS": "307",
        "Description": "Theft after preparation for hurt"
    },
    {
        "Category": {"Thefts", "Property Crime", "Extortion"},
        "IPC": "384",
        "BNS": "308(2)",
        "Description": "Extortion"
    },
    {
        "Category": {"Thefts", "Property Crime", "Robbery"},
        "IPC": "392",
        "BNS": "309(4)",
        "Description": "Robbery"
    },
    {
        "Category": {"Thefts", "Property Crime", "Dacoity"},
        "IPC": "395",
        "BNS": "310(2)",
        "Description": "Dacoity"
    },
    {
        "Category": {"Thefts", "Property Crime", "Dacoity", "Murder"},
        "IPC": "396",
        "BNS": "310(3)",
        "Description": "Dacoity with murder"
    },
    {
        "Category": {"Thefts", "Property Crime", "Snatching"},
        "IPC": "356",
        "BNS": "134",
        "Description": "Snatching"
    },
    
    # Forgery Category
    {
        "Category": {"Forgery", "Document Crime", "Fraud"},
        "IPC": "468",
        "BNS": "353(3)",
        "Description": "Forgery for purpose of cheating"
    },
    {
        "Category": {"Forgery", "Document Crime", "Electronic"},
        "IPC": "470",
        "BNS": "340",
        "Description": "Forged document or electronic record"
    },
    {
        "Category": {"Forgery", "Document Crime", "Using Forged"},
        "IPC": "471",
        "BNS": "340",
        "Description": "Using as genuine a forged document"
    },
    
    # Nuisance Category
    {
        "Category": {"Nuisance", "Public Order", "Disturbance"},
        "IPC": "290",
        "BNS": "292",
        "Description": "Public nuisance"
    },
    {
        "Category": {"Nuisance", "Traffic", "Hit and Run"},
        "IPC": "Hit and run",
        "BNS": "106(2)",
        "Description": "Hit and run cases"
    },
    {
        "Category": {"Nuisance", "Public Order", "Mischief"},
        "IPC": "228 A",
        "BNS": "72",
        "Description": "Disclosure of identity of victim"
    },
    
    # Kidnap/Abduction Category
    {
        "Category": {"Kidnap", "Abduction", "Person"},
        "IPC": "363",
        "BNS": "137(2)",
        "Description": "Kidnapping"
    },
    {
        "Category": {"Kidnap", "Abduction", "Begging"},
        "IPC": "363(a)",
        "BNS": "139",
        "Description": "Kidnapping for begging"
    },
    {
        "Category": {"Kidnap", "Abduction", "Person"},
        "IPC": "362",
        "BNS": "138",
        "Description": "Abduction"
    },
    {
        "Category": {"Kidnap", "Murder", "Abduction"},
        "IPC": "364",
        "BNS": "140",
        "Description": "Kidnapping for murder"
    },
    {
        "Category": {"Kidnap", "Ransom", "Abduction"},
        "IPC": "364(A)",
        "BNS": "140(2)",
        "Description": "Kidnapping for ransom"
    },
    {
        "Category": {"Kidnap", "Confinement", "Person"},
        "IPC": "365",
        "BNS": "140(3)",
        "Description": "Kidnapping with intent to confine"
    },
    {
        "Category": {"Kidnap", "Marriage", "Force"},
        "IPC": "367",
        "BNS": "140(4)",
        "Description": "Kidnapping to compel marriage"
    },
    {
        "Category": {"Kidnap", "Trafficking", "Person"},
        "IPC": "370",
        "BNS": "143",
        "Description": "Trafficking of persons"
    },
    {
        "Category": {"Kidnap", "Trafficking", "Exploitation"},
        "IPC": "370(A)",
        "BNS": "144",
        "Description": "Exploitation of trafficked person"
    },
    
    # Cheating Category
    {
        "Category": {"Cheating", "Fraud", "Deception"},
        "IPC": "417",
        "BNS": "318(2)",
        "Description": "Cheating"
    },
    {
        "Category": {"Cheating", "Fraud", "Identity"},
        "IPC": "419",
        "BNS": "319(2)",
        "Description": "Cheating by personation"
    },
    {
        "Category": {"Cheating", "Fraud", "Dishonest Delivery"},
        "IPC": "420",
        "BNS": "318(4)",
        "Description": "Cheating and dishonestly inducing delivery"
    },
    
    # Misappropriation Category
    {
        "Category": {"Misappropriation", "Property Crime", "Trust"},
        "IPC": "406",
        "BNS": "316(2)",
        "Description": "Criminal breach of trust"
    },
    {
        "Category": {"Misappropriation", "Property Crime", "Trust"},
        "IPC": "408",
        "BNS": "316(4)",
        "Description": "Criminal breach of trust by clerk or servant"
    },
    {
        "Category": {"Misappropriation", "Property Crime", "Public Servant"},
        "IPC": "409",
        "BNS": "316(5)",
        "Description": "Criminal breach of trust by public servant"
    },
    
    # Suicides Category
    {
        "Category": {"Suicides", "Abetment", "Death"},
        "IPC": "306",
        "BNS": "108",
        "Description": "Abetment of suicide"
    },
    {
        "Category": {"Suicides", "Threat", "Public Servant"},
        "IPC": "Threat to officer",
        "BNS": "226",
        "Description": "Threat to public officer"
    },
    
    # Criminal Procedure Code
    {
        "Category": {"CrPC", "Procedure", "Notice"},
        "IPC": "41 A",
        "BNS": "35(3,4,5,6)",
        "Description": "Notice of appearance before police officer"
    },
    {
        "Category": {"CrPC", "Procedure", "Intimidation"},
        "IPC": "50",
        "BNS": "47",
        "Description": "Intimation to person arrested"
    },
    
    # Other Categories
    {
        "Category": {"Other", "Public Order", "Assembly"},
        "IPC": "120(b)",
        "BNS": "61(2)",
        "Description": "Criminal conspiracy"
    },
    {
        "Category": {"Other", "Property Crime", "Mischief"},
        "IPC": "153(a)",
        "BNS": "196",
        "Description": "Promoting enmity between groups"
    },
    {
        "Category": {"Other", "Property Crime", "Mischief"},
        "IPC": "506",
        "BNS": "351(2)",
        "Description": "Criminal intimidation"
    },
    {
        "Category": {"Other", "Property Crime", "Mischief"},
        "IPC": "506(2)",
        "BNS": "351(3)",
        "Description": "Criminal intimidation (aggravated)"
    },
    {
        "Category": {"Other", "Document Crime", "Forgery"},
        "IPC": "353",
        "BNS": "132",
        "Description": "Assault to deter public servant"
    },
    {
        "Category": {"Other", "Public Order", "Disobedience"},
        "IPC": "307",
        "BNS": "109",
        "Description": "Attempt to murder"
    },
    
    # Relatives, Fitness, and Hours
    {
        "Category": {"Relatives", "Social", "Family"},
        "IPC": "50A",
        "BNS": "48",
        "Description": "Obligation of person making arrest to inform about arrest to relatives"
    },
    {
        "Category": {"Fitness", "Medical", "Examination"},
        "IPC": "53",
        "BNS": "51",
        "Description": "Medical examination"
    },
    {
        "Category": {"Hours", "Time", "Arrest"},
        "IPC": "57 24 hrs",
        "BNS": "58",
        "Description": "24-hour arrest detention limit"
    },
    {
        "Category": {"CrPC", "Finance", "Security"},
        "IPC": "154 Cr.P.C. FIR",
        "BNS": "173",
        "Description": "First Information Report"
    },
    {
        "Category": {"CrPC", "Procedure", "Cognizance"},
        "IPC": "161 Cr.P.C",
        "BNS": "180",
        "Description": "Examination of witnesses by police"
    },
    {
        "Category": {"CrPC", "Procedure", "Cognizance"},
        "IPC": "164 Cr.P.C",
        "BNS": "183",
        "Description": "Recording of confessions and statements"
    },
    {
        "Category": {"CrPC", "Procedure", "Cognizance"},
        "IPC": "17A Cr.P.C",
        "BNS": "190",
        "Description": "Previous sanction for prosecution"
    }
]


def recommend_law(keywords):
    """
    Find matching laws based on provided keywords
    
    Args:
        keywords (list): List of keyword strings to search for
    
    Returns:
        list: List of matching law dictionaries
    """
    matching_laws = []
    keywords_set = set(word.lower() for word in keywords)
    
    for rule in rules:
        category_words = set(word.lower() for word in rule["Category"])
        
        # Check if any keyword matches the category
        if keywords_set.intersection(category_words):
            matching_laws.append({
                "IPC": rule["IPC"],
                "BNS": rule["BNS"],
                "Description": rule["Description"],
                "Category": list(rule["Category"])
            })
    
    return matching_laws if matching_laws else [{"Message": "No matching laws found"}]


def get_all_keywords():
    """
    Extract all unique keywords from the rules database
    
    Returns:
        list: Sorted list of all unique keywords
    """
    all_keywords = set()
    for rule in rules:
        all_keywords.update(rule["Category"])
    return sorted(list(all_keywords))


# Example usage and testing
if __name__ == "__main__":
    print("Legal Expert System - IPC to BNS Mapping")
    print("=" * 50)
    
    # Test cases
    test_keywords = [
        ["Rape", "Violence"],
        ["Theft", "Property"],
        ["Murder"],
        ["Kidnap", "Abduction"],
        ["Women", "Assault"]
    ]
    
    for keywords in test_keywords:
        print(f"\n\nSearching for: {', '.join(keywords)}")
        print("-" * 50)
        results = recommend_law(keywords)
        
        for result in results:
            if "Message" in result:
                print(f"  {result['Message']}")
            else:
                print(f"  IPC {result['IPC']} → BNS {result['BNS']}")
                print(f"  Description: {result['Description']}")
                print(f"  Categories: {', '.join(result['Category'])}")
                print()
    
    # Display all available keywords
    print("\n\n" + "=" * 50)
    print("All Available Keywords:")
    print("=" * 50)
    keywords = get_all_keywords()
    for i, keyword in enumerate(keywords, 1):
        print(f"{i}. {keyword}")